const Order = require("../models/Orders");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const mime = require("mime");
const xl = require("excel4node");
const path = require("path");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const validateOTP = async (req, res) => {
  var { otp } = req.body;
  const { email } = req.params;
  otp = parseInt(otp);
  if (!otp) {
    throw new BadRequestError("Please Provide OTP");
  }
  if (!email) {
    throw new BadRequestError("Please Provide email");
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new BadRequestError("Please Provide Valid email");
  }
  if (otp !== admin.otp) {
    throw new BadRequestError("Please Provide Valid OTP");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: admin });
};

const updatePassword = async (req, res) => {
  console.log(req.body);
  console.log(req.params);
  const { email } = req.params;
  var { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const admin = await Admin.findOneAndUpdate(
    { email },
    { password },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(StatusCodes.OK).json({ res: "success", data: admin });
};

const getAdminDetails = async (req, res) => {
  const { email } = req.params;
  const admin = await Admin.find({ email });
  if (!admin) {
    throw new BadRequestError("Invalid email");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: admin });
};

const getCanteenDetails = async (req, res) => {
  const { canteen } = req.params;
  const canteenobj = await Canteen.find({ name: canteen });
  if (!canteenobj) {
    throw new BadRequestError("Invalid canteen name");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: canteenobj });
};

const getSpecificCustomers = async (req, res) => {
  const { name } = req.query;
  if (name === "") {
    throw new BadRequestError("No name provided");
  }
  const data = await User.find({ name: { $regex: name, $options: "i" } });
  res.status(StatusCodes.OK).json({ res: "success", data });
};
const getSpecificOrders = async (req, res) => {
  const { status } = req.query;
  if (status === "NEW" || status === "COMPLETED") {
    const orders = await Order.find({ status });
    res.status(StatusCodes.OK).json({ res: "success", data: orders });
  } else {
    throw new BadRequestError("Invalid value of status");
  }
};

const payCanteen = async (req, res) => {
  var { price } = req.body;
  price = parseInt(price);
  if (!price) {
    throw new BadRequestError("Enter price");
  }
  const canteen = await Canteen.findOne({ name: "Sachivalaya" });
  const bal = canteen.wallet - price;
  const cashotp = Math.floor(Math.random() * 10000);
  canteen.wallet = bal;
  canteen.cashotp = cashotp;
  const updated = await Canteen.findOneAndUpdate(
    { name: "Sachivalaya" },
    canteen,
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(StatusCodes.OK).json({ res: "success", data: updated });
};

const validateCashotp = async (req, res) => {
  var { otp, canteenName } = req.body;

  otp = parseInt(otp);
  if (!otp) {
    throw new BadRequestError("Please Provide OTP");
  }
  if (!canteenName) {
    throw new BadRequestError("Please Provide email");
  }
  const canteen = await Canteen.findOne({ name: canteenName });

  if (!canteen) {
    throw new BadRequestError("Please Provide Valid email");
  }
  if (otp !== canteen.cashotp) {
    throw new BadRequestError("wrong otp");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: canteen });
};

const getCustomersLength = async (req, res) => {
  const customers = await User.find({});
  res.status(StatusCodes.OK).json({ res: "success", data: customers.length });
};

const lastReportGeneration = async (req, res) => {
  let i = 0;
  const order = await Order.find({ paymentmode: "KOT", status: "COMPLETED" });
  let currentMonth = new Date().getMonth();
  currentMonth++;
  let currentYear = new Date().getFullYear();
  if (currentMonth == 1) {
    currentMonth = 13;
    currentYear -= 1;
  }
  let arr = [];
  let headerColumns = [
    "Order ID",
    "Customer's Name",
    "Total Price",
    "Quantity",
    "Payment Mode",
  ];
  order.forEach(async (ord) => {
    const d = new Date(ord._id.getTimestamp());
    const dMonth = d.getMonth() + 1;
    const dYear = d.getFullYear();
    if (currentYear == dYear && currentMonth - dMonth == 1) {
      let obj = {};
      let user = await User.findOne({ _id: ord.userId });
      obj.orderid = ord._id;
      obj.username = user.name;
      obj.price = ord.price;
      let qty = 0;
      ord.items.forEach((item) => {
        qty += item.qty;
      });
      obj.qty = qty;
      obj.paymentmode = ord.paymentmode;

      arr[i] = obj;
      i++;
    }
  });
  setTimeout(() => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("REPORT");
    let colIndex = 1;
    headerColumns.forEach((item) => {
      ws.cell(1, colIndex++).string(item);
    });
    let rowIndex = 2;
    arr.forEach((item) => {
      let columnIndex = 1;
      Object.keys(item).forEach((colName) => {
        ws.cell(rowIndex, columnIndex++).string(item[colName].toString());
      });
      rowIndex++;
    });
    wb.write(`./controllers/lastMonthReport.xlsx`);
    const file = __dirname + "/lastMonthReport.xlsx";
    const fileName = path.basename(file);
    const mimeType = mime.getType(file);
    res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
    res.setHeader("Content-Type", mimeType);
    setTimeout(() => {
      res.download(file);
    }, 2000);
  }, 2000);
};
const thisReportGeneration = async (req, res) => {
  let i = 0;
  const order = await Order.find({ paymentmode: "KOT", status: "COMPLETED" });
  let currentMonth = new Date().getMonth();
  currentMonth++;
  let currentYear = new Date().getFullYear();
  let arr = [];
  let headerColumns = [
    "Order ID",
    "Customer's Name",
    "Total Price",
    "Quantity",
    "Payment Mode",
  ];
  order.forEach(async (ord) => {
    const d = new Date(ord._id.getTimestamp());
    const dMonth = d.getMonth() + 1;
    const dYear = d.getFullYear();
    // console.log(dMonth)
    if (currentYear == dYear && currentMonth - dMonth == 0) {
      let obj = {};

      // console.log(ord)
      let user = await User.findOne({ _id: ord.userId });
      // console.log(user)
      obj.orderid = ord._id;
      obj.username = user?.name;
      obj.price = ord.price;
      let qty = 0;
      ord.items.forEach((item) => {
        qty += item.qty;
      });
      obj.qty = qty;
      obj.paymentmode = ord.paymentmode;

      arr[i] = obj;
      i++;
    }
  });
  setTimeout(() => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet("REPORT");
    let colIndex = 1;
    headerColumns.forEach((item) => {
      ws.cell(1, colIndex++).string(item);
    });
    let rowIndex = 2;
    arr.forEach((item) => {
      let columnIndex = 1;
      Object.keys(item).forEach((colName) => {
        ws.cell(rowIndex, columnIndex++).string(item[colName]?.toString());
      });
      rowIndex++;
    });
    wb.write(`./controllers/thisMonthReport.xlsx`);
    const file = __dirname + "/thisMonthReport.xlsx";
    const fileName = path.basename(file);
    const mimeType = mime.getType(file);
    res.setHeader("Content-Disposition", "attachment;filename=" + fileName);
    res.setHeader("Content-Type", mimeType);
    setTimeout(() => {
      res.download(file);
    }, 2000);
  }, 2000);
};

// const fullfillAdminPayment = async (req, res) => {
//   console.log("fullfiled called");
//   const canteen = await Canteen.findOneAndUpdate(
//     { name: "Sachivalaya" },
//     { wallet: 0 },
//     {
//       runValidators: true,
//       new: true,
//       setDefaultsOnInsert: true,
//     }
//   );

const fullfillAdminPayment = async (req, res) => {
  const canteen = await Canteen.findOneAndUpdate(
    { name: "Sachivalaya" },
    { wallet: 0 },
    {
      runValidators: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );

  res.status(StatusCodes.OK).json({ res: "success", data: canteen });
};
module.exports = {
  validateOTP,
  updatePassword,
  getAdminDetails,
  getSpecificCustomers,
  getCanteenDetails,
  getSpecificOrders,
  payCanteen,
  validateCashotp,
  getCustomersLength,
  thisReportGeneration,
  lastReportGeneration,
  fullfillAdminPayment,
};
