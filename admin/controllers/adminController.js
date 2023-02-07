const Order = require("../models/Orders");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
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
const getSpecificOrders = async(req,res)=>{
  const { status } = req.query;
  if (status === "NEW" || status === "COMPLETED") {
    const orders = await Order.find({ status });
    res.status(StatusCodes.OK).json({ res: "success", data: orders });
  } else {
    throw new BadRequestError("Invalid value of status");
  }
}

const payCanteen = async(req,res)=>{
  var {price} = req.body;
  price = parseInt(price);
  if(!price)
  {
    throw new BadRequestError('Enter price')
  }
  const canteen = await Canteen.findOne({name:'Sachivalaya'})
  const bal = canteen.wallet - price;
  const cashotp = Math.floor(Math.random() * 10000);
  canteen.wallet = bal;
  canteen.cashotp = cashotp;
  const updated = await Canteen.findOneAndUpdate({name:'Sachivalaya'},canteen,{runValidators:true,new:true,setDefaultsOnInsert:true})
  res.status(StatusCodes.OK).json({res:"success",data:updated});
}

const validateCashotp = async(req,res)=>{

    var { otp,canteenName } = req.body;

    otp = parseInt(otp);
    if (!otp) {
      throw new BadRequestError("Please Provide OTP");
    }
    if (!canteenName) {
      throw new BadRequestError("Please Provide email");
    }
    const canteen = await Canteen.findOne({name:canteenName });
    
    if (!canteen) {
      throw new BadRequestError("Please Provide Valid email");
    }
    if (otp !== canteen.cashotp) {
      throw new BadRequestError("wrong otp");
    }
    res.status(StatusCodes.OK).json({ res: "success", data: canteen });
}

const getCustomersLength = async(req,res)=>{
  const customers = await User.find({});
  res.status(StatusCodes.OK).json({res:"success",data:customers.length})
}
module.exports = {
  validateOTP,
  updatePassword,
  getAdminDetails,
  getSpecificCustomers,
  getCanteenDetails,
  getSpecificOrders,
  payCanteen,
  validateCashotp,
  getCustomersLength
};
