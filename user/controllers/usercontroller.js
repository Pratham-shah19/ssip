const Order = require("../models/Orders");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Basket = require("../models/Basket");
const Orders = require("../models/Orders");
const bcrypt = require("bcryptjs");

const getUserDetails = async (req, res) => {
  var { uid } = req.params;
  const user = await User.findById(uid);
  if (!user) {
    throw new BadRequestError("Invalid user id");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: user });
};
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
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Please Provide Valid email");
  }
  if (otp !== user.otp) {
    throw new BadRequestError("Please Provide Valid OTP");
  }
  res.status(StatusCodes.OK).json({ res: "Success", data: user });
};
const updatePassword = async (req, res) => {
  const { email } = req.params;
  var { password } = req.body;
  const salt = await bcrypt.genSalt(10);
  password = await bcrypt.hash(password, salt);
  const user = await User.findOneAndUpdate(
    { email },
    { password },
    { runValidators: true, new: true, setDefaultsOnInsert: true }
  );

  res.status(StatusCodes.OK).json({ res: "success", data: user });
};
const updateUserDetails = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOneAndUpdate({ _id: uid }, req.body, {
    new: true,
    runValidators,
    setDefaultsOnInsert: true,
  });
  if (!user) {
    throw new BadRequestError("Invalid user id");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: user });
};
const getBalance = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findById(uid);
  if (!user) {
    throw new BadRequestError("Invalid user id");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: user.wallet });
};

const getOrdersSpecific = async (req, res) => {
  const { status } = req.query;
  if (status === "NEW" || status === "COMPLETED") {
    const orders = await Order.find({ status });
    res.status(StatusCodes.OK).json({ res: "success", data: orders });
  } else {
    throw new BadRequestError("Invalid value of status");
  }
};

const getAllDishes = async (req, res) => {
  const dishes = await Dish.find({});
  res.status(StatusCodes.OK).json({ res: "success", data: dishes });
};

const getFilteredDishes = async (req, res) => {
  const { search, sort } = req.query;
  obj = {};
  var page = Number(req.query.page) || 1;
  var limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  //search dishes by name
  if (search) {
    var resp = await Dish.find({ name: { $regex: search, $options: "i" } });
  }
  //sort
  if (sort) {
    const sortLIST = sort.split(",").join(" ");
    resp = resp.sort(sortLIST).skip(skip).limit(limit);
  }

  res.status(StatusCodes.OK).json({ res: "success", data: resp });
};

const getDishesCategorized = async (req, res) => {
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

const addToCart = async (req, res) => {
  const userId = req.params.uid;
  const { itemId, qty, price } = req.body;
  if (!itemId || !qty || !price) {
    throw new BadRequestError("Invalid id , qty and price");
  }

  const cartObject = await Basket.findOne({ userId: userId });
  if (cartObject) {
    cartObject.price += price;
    cartObject.items.push({ dishId: itemId, qty: qty });
    var dish = await Basket.findOneAndUpdate({ userId }, cartObject, {
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
  } else {
    const newObj = {};
    let arr = [];
    arr.push({ dishId: itemId, qty: qty });
    newObj.userId = userId;
    newObj.price = price;
    newObj.items = arr;
    var dish = await Basket.findOneAndUpdate({ userId }, newObj, {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
  }

  res.status(StatusCodes.OK).json({ res: "success", data: dish });
};

const getCart = async (req, res) => {
  const userId = req.params.uid;
  const cartObject = await Basket.findOne({ userId });
  res.status(StatusCodes.OK).json({ res: "success", data: cartObject });
};

const canPayWallet = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ _id: uid });
  const basket = await Basket.findOne({ userId: uid });
  console.log(user.wallet, basket.price);
  if (basket.price <= user.wallet) {
    res.status(StatusCodes.OK).json({ res: "success", data: true });
  } else {
    res.status(StatusCodes.OK).json({ res: "success", data: false });
  }
};
const payCanteen = async (req, res) => {
  const { uid } = req.params;
  const { price, canteenName } = req.body;
  const user = await User.findOne({ _id: uid });
  if(!user)
  {
    throw new BadRequestError('Invalid userid')
  }
  //deducting price from user's wallet
  const deduct = await User.findOneAndUpdate(
    { _id: uid },
    { wallet: user.wallet - price },
    { new: true, runValidators: true }
  );

  //adding coins to canteen's wallet
  const canteen = await Canteen.findOne({ name: canteenName });
  if(!canteen)
  {
    throw new BadRequestError('Invalid caneteen name')
  }
  const pay = await Canteen.findOneAndUpdate(
    { name: canteenName },
    { wallet: canteen.wallet + price },
    { new: true, runValidators: true }
  );
  const basket = await Basket.findOne({ userId: uid });
  console.log(basket)
  if(!basket)
  {
    throw new BadRequestError('Invalid user id, could not find basket')
  }
  //generating otp
  const otp = Math.floor(Math.random() * 10000);
  const orderObj = {};
  orderObj.items = basket.items;
  orderObj.userId = basket.userId;
  orderObj.price = price;
  orderObj.otp = otp;
  //creating order
  const order = await Orders.create(orderObj);
  //deleting basket
  const emptyBasket = await Basket.findOneAndDelete({ userId: uid });

  res.status(StatusCodes.CREATED).json({ res: "success", data: deduct.wallet });
};

const addRating = async (req, res) => {
  const { dishId, rating } = req.body;
  const dish = await Dish.findOne({ _id: dishId });
  if (!dish) {
    throw new BadRequestError("Invalid dish id");
  }
  rating = new Number(rating);
  dish.rating = (dish.rating + rating) / 2;
  const Updated = await Dish.findOneAndUpdate({ _id: dishId }, dish, {
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });

  res.status(StatusCodes.OK).json({ res: "success", data: Updated });
};

module.exports = {
  getUserDetails,
  getBalance,
  getOrdersSpecific,
  getAllDishes,
  getFilteredDishes,
  getDishesCategorized,
  addToCart,
  getCart,
  canPayWallet,
  payCanteen,
  addRating,
  updateUserDetails,
  updatePassword,
  validateOTP,
};
