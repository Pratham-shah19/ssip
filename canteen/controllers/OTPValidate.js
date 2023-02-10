const Order = require("../models/Orders");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const canteenOTPValidate = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.params;
  if (!otp) {
    throw new BadRequestError("Please Provide OTP");
  }
  if (!email) {
    throw new BadRequestError("Please Provide email");
  }
  const canteen = await Canteen.findOne({ email });
  if (!canteen) {
    throw new BadRequestError("Please Provide Valid email");
  }
  if (Number(otp) !== canteen.otp) {
    throw new BadRequestError("Please Provide Valid OTP");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: canteen });
};

module.exports = { canteenOTPValidate };
