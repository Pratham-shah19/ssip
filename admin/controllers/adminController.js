const Order = require("../models/Orders");
const Admin = require("../models/Admin");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const validateOTP = async (req, res) => {
  const { otp } = req.body;
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
  res.status(StatusCodes.OK).json({ res: "Success", data: admin });
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
  const { Canteen } = req.params;
  const canteen = await Canteen.find({ name: canteen });
  if (!canteen) {
    throw new BadRequestError("Invalid canteen name");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: canteen });
};

const getSpecificCustomers = async (req, res) => {
  const { name } = req.query;
  if (name === "") {
    throw new BadRequestError("No name provided");
  }
  const data = await User.find({ name: { $regex: name, $options: "i" } });
  res.status(StatusCodes.OK).json({ res: "success", data });
};

module.exports = {
  validateOTP,
  updatePassword,
  getAdminDetails,
  getSpecificCustomers,
  getCanteenDetails
};
