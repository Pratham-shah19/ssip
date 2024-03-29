const Order = require("../models/Orders");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const mime = require("mime");
const xl = require("excel4node");
const path = require("path");
const Subscription = require('../models/Subscription')
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const stripe = require("stripe")(
  "sk_test_51KyqwvSFXhJBixXAbp2HBSBo65HD0T1BqG60ABDZrLJnFBWonmCw1KCdHIFVFG7TDYkE0qCZs6BORYhBSQX3be5g00hRtIdRtI"
);

const getCurrentOrders = async (req, res) => {
  const orders = await Order.find({ status: "NEW" }).sort({ createdAt: 1 });
  var data = [];
  for (let i = 0; i < orders.length; i++) {
    let orderObject = {};
    const user = await User.findOne({ _id: orders[i].userId });
    if (!user) {
      var userName = "Guest";
    } else {
      var userName = user.name;
    }
    var items = orders[i].items;
    var updatedItems = [];
    for (let j = 0; j < items.length; j++) {
      const dish = await Dish.findOne({ _id: items[j].dishId });
      if (!dish) {
        var obj = { qty: items[j].qty, dishName: "Idli Sambhar" };
      } else {
        var obj = { qty: items[j].qty, dishName: dish.name };
      }
      updatedItems.push(obj);
    }
    orderObject.orderdetail = orders[i];
    orderObject.items = updatedItems;
    orderObject.userdetail = userName;
    data.push(orderObject);
  }
  res
    .status(StatusCodes.OK)
    .json({ res: "success", length: orders.length, data });
};

const getHistoryOrders = async (req, res) => {
  const orders = await Order.find({ status: "COMPLETED" }).sort({
    updatedAt: -1,
  });
  var data = [];
  for (let i = 0; i < orders.length; i++) {
    let orderObject = {};
    const user = await User.findOne({ _id: orders[i].userId });
    if (!user) {
      var userName = "Guest";
    } else {
      var userName = user.name;
    }
    var items = orders[i].items;
    var updatedItems = [];
    for (let j = 0; j < items.length; j++) {
      const dish = await Dish.findOne({ _id: items[j].dishId });
      if (!dish) {
        var obj = { qty: items[j].qty, dishName: "Idli Sambhar" };
      } else {
        var obj = { qty: items[j].qty, dishName: dish.name };
      }
      updatedItems.push(obj);
    }
    orderObject.orderdetail = orders[i];
    orderObject.items = updatedItems;
    orderObject.userdetail = userName;
    data.push(orderObject);
  }
  res
    .status(StatusCodes.OK)
    .json({ res: "success", length: orders.length, data });
};

const getUser = async (req, res) => {
  const { uid } = req.params;
  if (!uid) {
    throw new BadRequestError("Please Provide User id");
  }
  const user = await User.findOne({ _id: uid });
  if (!user) {
    throw new NotFoundError("Please provide valid user id");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: user });
};

const getAllDish = async (req, res) => {
  const dishes = await Dish.find({});
  res.status(StatusCodes.OK).json({ res: "Success", data: dishes });
};

const getDish = async (req, res) => {
  const { did } = req.params;
  if (!did) {
    throw new BadRequestError("Please Provide Dish id");
  }
  const dish = await Dish.findOne({ _id: did });
  if (!dish) {
    throw new NotFoundError("Please provide valid dish id");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: dish });
};

const modifyDish = async (req, res) => {
  const { did } = req.params;
  if (!did) {
    throw new BadRequestError("Please Provide Dish id");
  }
  const dish = await Dish.findOneAndUpdate({ _id: did }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!dish) {
    throw new NotFoundError("Please provide valid dish id");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: dish });
};

const fetchAllCanteen = async (req, res) => {
  const canteen = await Canteen.find({});
  res.status(StatusCodes.OK).json({ res: "Success", data: canteen });
};

const getUserByEmail = async (req, res) => {
  const { email } = req.params;
  if (!email) {
    throw new BadRequestError("Please Provide User email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Please provide valid user email");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: user });
};

const addOrder = async (req, res) => {
  const { status, items, price } = req.body;
  if (!status || !items || !price) {
    throw new BadRequestError("Please Provide Required fields");
  }
  req.body.button = true;
  req.body.paymentmode = "CASH";
  const order = await Order.create(req.body);
  res.status(StatusCodes.OK).json({ res: "Success", data: order });
};

const updateCanteenDetails = async (req, res) => {
  const { canteenId } = req.user;
  const canteen = await Canteen.findOneAndUpdate({ _id: canteenId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!canteen) {
    throw new BadRequestError("Please Provide Valid Canteen Details");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: canteen });
};

const guestCompletedButton = async (req, res) => {
  const { oid } = req.params;
  if (!oid) {
    throw new BadRequestError("Please Provide Order ID");
  }
  const completedButton = await Order.findOneAndUpdate(
    { _id: oid },
    { status: "COMPLETED" },
    { new: true, runValidators: true }
  );
  if (!completedButton) {
    throw new BadRequestError("Please Provide Valid Order ID");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: completedButton });
};

const dishFilter = async (req, res) => {
  const { name, sort } = req.query;
  const queryObject = {};
  var page = Number(req.query.page) || 1;
  var limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  //search dishes by name
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  var resp = Dish.find(queryObject);
  //sort
  if (sort) {
    const sortLIST = sort.split(",").join(" ");
    resp = resp.sort(sortLIST).skip(skip).limit(limit);
  }
  const result = await resp;
  res.status(StatusCodes.OK).json({ res: "success", data: result });
};

const dishCategory = async (req, res) => {
  var findEl = "category";
  var resp = await Dish.find({});
  var groupby = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  const result = groupby(resp, findEl);
  res.status(StatusCodes.OK).json({ res: "success", data: result });
};

const modifyQuantity = async (req, res) => {
  const { did } = req.params;
  const { quantity } = req.body;
  if (!did || !quantity) {
    throw new BadRequestError("Please Provide Required Credential");
  }
  const dish = await Dish.findOne({ _id: did });
  if (!dish) {
    throw new BadRequestError("Please Provide Valid Dish ID");
  }
  const newQuantity = dish.quantity + quantity;
  if (newQuantity < 10) {
    throw new BadRequestError("Please Provide Minimum Quantity");
  }
  const updatedDish = await Dish.findOneAndUpdate(
    { _id: did },
    { quantity: newQuantity, isAvailable: true },
    { new: true, runValidators: true }
  );
  res.status(StatusCodes.OK).json({ res: "success", data: updatedDish });
};

const addDish = async (req, res) => {
  const { name, imageUrl, category, price } = req.body;
  if (!name || !imageUrl || !category || !price) {
    throw new BadRequestError("Please Provide valid credentials");
  }
  const product = await stripe.products.create({
    name: name,
    images: [imageUrl],
    description: category,
  });
  const priceid = await stripe.prices.create({
    unit_amount: price * 100,
    currency: "inr",
    product: product.id,
  });
  req.body.priceId = priceid.id;
  req.body.prodId = product.id;
  const dish = await Dish.create(req.body);
  res.status(StatusCodes.OK).json({ res: "Success", data: dish });
};

const deletebtn = async (req, res) => {
  const did = req.params.did;
  if (!did) {
    throw new BadRequestError("Please Provide Required Credential");
  }
  const dish = await Dish.findOneAndUpdate(
    { _id: did },
    { quantity: 0, isAvailable: false },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!dish) {
    throw new BadRequestError("Please Provide Valid Dish ID");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: dish });
};

const resetWallet = async (req, res) => {
  const date = new Date();
  if (date.getDate() === 1 && date.getMonth() === 1) {
    await User.updateMany({}, { wallet: 5000 });
  }
  res.status(StatusCodes.OK).json({ res: "Success" });
};

const lastReportGeneration = async (req, res) => {
  let i = 0;
  const order = await Order.find({ status: "COMPLETED" });
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
  const order = await Order.find({ status: "COMPLETED" });
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
    console.log(dMonth);
    if (currentYear == dYear && currentMonth - dMonth == 0) {
      let obj = {};

      console.log(ord);
      let user = await User.findOne({ _id: ord.userId });
      console.log(user);
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

const walletDetails = async (req, res) => {
  const canteen = await Canteen.findOne({ name: "Sachivalaya" });
  res.status(StatusCodes.OK).json({ res: "success", wallet: canteen.wallet });
};

const subscriptionSearch = async(req,res) => {
  const {search} = req.query;
  const obj={status:'ACTIVE'}
  if(search){
    obj.username = {$regex:search,$options:'i'}
  }
  const subs = await Subscription.find(obj);
  setTimeout(()=>{
    res.status(StatusCodes.OK).json({ res: "success", data:subs });
  },1000)
}

const decrementSubsQuantity = async (req,res) => {
  const {sid} = req.params;
  const {qty} = req.body;
  if(!sid || !qty){
    throw new BadRequestError("Please Provide Valid Credentials");
  }
  const subs = await Subscription.findOne({_id:sid})
  if(subs.quantity-qty<0){
    throw new BadRequestError("Not enough Quantity");
  }
  
  subs.quantity = subs.quantity-qty;
  const obj = {}
  if(subs.quantity == 0){
    const subsu = await Subscription.findOneAndUpdate({_id:sid},{status:"EXPIRED"},
      { new: true, runValidators: true })
    res.status(StatusCodes.OK).send({res: "success"}) 
  }
  else{
    setTimeout(async()=>{
      const subsu = await Subscription.findOne({_id:sid})
      obj.status = "COMPLETED";
      obj.userId = subsu.userId;
      let dishId = String(subsu.dishId)
      obj.items = [{dishId:dishId,qty:qty}]
      const dish = await Dish.findOne({_id:subsu.dishId})
      obj.price = dish.price*qty
      obj.paymentmode = subsu.paymentmode
      obj.ordertype = "SUBSCRIPTION";
      const order = await Order.create(obj)
      const subsuv = await Subscription.findOneAndUpdate({_id:sid},{quantity:subs.quantity},
      { new: true, runValidators: true })
      res.status(StatusCodes.OK).send({res:"success",data:subsuv})
    },1000)
  
  }
  
}

const resetButton = async (req,res) => {
  const dishes = await Dish.find({})
  dishes.forEach(async (dish)=>{
    const dishx = await Dish.findOneAndUpdate({_id:dish._id},{slot1:0,slot2:0,slot3:0},{ new: true, runValidators: true })
  })
  setTimeout(()=>{
    res.status(StatusCodes.OK).send({res:"success"})
  },2000)
}

const displayDish = async (req, res) => {
  const { did } = req.params;
  if (!did) {
    throw new BadRequestError("Please Provide Valid Dish ID");
  }
  const dish = await Dish.findOne({ _id: did });
  const arr = [
    { name: "slot1", qty: dish.slot1 },
    { name: "slot2", qty: dish.slot2 },
    { name: "slot3", qty: dish.slot3 },
  ];
  res
    .status(StatusCodes.OK)
    .send({ res: "success", name: dish.name, data: arr });
};


const searchGraph = async (req,res) => {
  const {search} = req.query;
  const obj={}
  if(search){
    obj.name = {$regex:search,$options:'i'}
  }
  const dish = await Dish.find(obj);
  setTimeout(()=>{
    res.status(StatusCodes.OK).json({ res: "success", data:dish });
  },1000)
}

module.exports = {
  searchGraph,
  displayDish,
  resetButton,
  decrementSubsQuantity,
  subscriptionSearch,
  walletDetails,
  lastReportGeneration,
  thisReportGeneration,
  deletebtn,
  resetWallet,
  addDish,
  modifyQuantity,
  getCurrentOrders,
  getHistoryOrders,
  getUser,
  getAllDish,
  getDish,
  modifyDish,
  fetchAllCanteen,
  getUserByEmail,
  addOrder,
  updateCanteenDetails,
  guestCompletedButton,
  dishFilter,
  dishCategory,
};
