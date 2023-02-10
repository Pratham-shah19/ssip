const Order = require("../models/Orders");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const Subscription = require("../models/Subscription");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const Basket = require("../models/Basket");
const Orders = require("../models/Orders");
const bcrypt = require("bcryptjs");
const { json } = require("express");
require("dotenv").config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const getUserDetails = async (req, res) => {
  var { uid } = req.params;
  const user = await User.findById(uid);
  if (!user) {
    throw new BadRequestError("Invalid user id");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: user });
};
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
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Please Provide Valid email");
  }
  if (otp !== user.otp) {
    throw new BadRequestError("Please Provide Valid OTP");
  }
  res.status(StatusCodes.OK).json({ res: "success", data: user });
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
    runValidators: true,
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
  const userId = req.params.uid;

  if (status === "NEW" || status === "COMPLETED") {
    const orders = await Order.find({ status, userId }).sort({ createdAt: -1 });

    for (let i = 0; i < orders.length; i++) {
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
      orders[i].items = updatedItems;
    }
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
    var resp = await Dish.find({
      name: { $regex: search, $options: "i" },
      isAvailable: true,
    });
  }
  //sort
  if (sort) {
    const sortLIST = sort.split(",").join(" ");
    resp = await Dish.find({ isAvailable: true })
      .sort("-" + sortLIST)
      .limit(limit);
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
    var arr = cartObject.items;
    var flag = 0;
    arr.forEach((e) => {
      if (e.dishId === itemId) {
        e.qty += qty;
        flag = 1;
      }
    });
    if (flag === 0) {
      arr.push({ dishId: itemId, qty: qty });
    }

    cartObject.items = arr;
    var dish = await Basket.findOneAndUpdate({ userId }, cartObject, {
      new: true,
      runValidators: true,
    });
  } else {
    var newObj = {};
    let arr = [];
    arr.push({ dishId: req.body.itemId, qty: req.body.qty });
    newObj = { items: arr, userId, price: req.body.price };
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
  const order = await Basket.findOne({ userId });
  if (!order) {
    res.status(StatusCodes.OK).json({ res: "none", data: "no basket" });
  } else {
    let j = 0;
    let arr = [];
    for (let i = 0; i < order?.items.length; i++) {
      const dishname = await Dish.findOne({ _id: order?.items[i].dishId });
      arr[j] = { qty: order?.items[i].qty, items: dishname };

      j++;
    }
    const obj = { data: arr, price: order?.price, userId };
    res.status(StatusCodes.OK).json({ res: "success", data: obj });
  }
};

const removeItem = async (req, res) => {
  const userId = req.params.uid;
  const { itemId } = req.body;

  if (!itemId) {
    throw new BadRequestError("please provide item id!");
  } else {
    const item = await Dish.findOne({ _id: itemId });
    const userBasket = await Basket.findOne({ userId });
    let items = [];
    const dishes = userBasket.items;
    if (dishes.length === 1) {
      const deleteBasket = await Basket.findOneAndDelete({ userId });
      res.status(200).json({ status: "success" });
    } else {
      dishes.forEach((e) => {
        if (e.dishId === itemId) {
          userBasket.price -= e.qty * item.price;
        } else {
          items.push(e);
        }
      });
      userBasket.items = items;
      const removed = await Basket.findOneAndUpdate({ userId }, userBasket, {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      });

      res.status(200).json({ status: "success", data: removed });
    }
  }
};

const canPayWallet = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ _id: uid });
  const basket = await Basket.findOne({ userId: uid });
  if (basket?.price <= user?.wallet) {
    res.status(StatusCodes.OK).json({ res: "success", data: true });
  } else {
    res.status(StatusCodes.OK).json({ res: "success", data: false });
  }
};

const createOrder = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ _id: uid });
  if (!user) {
    throw new BadRequestError("Invalid userid");
  }
  const basket = await Basket.findOne({ userId: uid });
  if (!basket) {
    throw new NotFoundError("Invalid user id, could not find basket");
  }
  var items = basket.items;
  items.forEach(async (e) => {
    let obj = {};
    const dish = await Dish.findOne({ _id: e.dishId, isAvailable: true });
    //if the dish is not available
    if (!dish) {
      res
        .status(StatusCodes.OK)
        .json({ res: "fail", data: "dish is not actually available" });
    } else {
      //if quantity is enough
      if (dish?.quantity >= e.qty) {
        obj.dishId = e.dishId;
        obj.qty = dish?.quantity - e.qty;
        if (obj.qty < 10) {
          const dish = await Dish.findOneAndUpdate(
            { _id: obj.dishId },
            { quantity: obj.qty, isAvailable: false },
            { runValidators: true, new: true }
          );
        } else {
          const dish = await Dish.findOneAndUpdate(
            { _id: obj.dishId },
            { quantity: obj.qty },
            { runValidators: true, new: true }
          );
        }
        res
          .status(StatusCodes.OK)
          .json({ res: "success", data: "Order valid" });
      }
      //if quantity is not enough
      else {
        res
          .status(StatusCodes.OK)
          .json({ res: "fail", data: "not enough quantity" });
      }
    }
  });
};
const payCanteen = async (req, res) => {
  const { uid } = req.params;
  const user = await User.findOne({ _id: uid });
  //canteen
  const canteen = await Canteen.findOne({ name: "Sachivalaya" });
  //user basket
  const basket = await Basket.findOne({ userId: uid });
  const price = basket.price;
  //deducting price from user's wallet
  const deduct = await User.findOneAndUpdate(
    { _id: uid },
    { wallet: user.wallet - price },
    { new: true, runValidators: true }
  );
  //adding coins to canteen's wallet
  const pay = await Canteen.findOneAndUpdate(
    { name: "Sachivalaya" },
    { wallet: canteen.wallet + price },
    { new: true, runValidators: true }
  );
  //generating otp
  const otp = Math.floor(Math.random() * 10000);
  const orderObj = {};
  orderObj.items = basket.items;
  orderObj.userId = basket.userId;
  orderObj.price = price;
  orderObj.otp = otp;

  //creating order
  const order = await Orders.create(orderObj);
  client.messages
    .create({
      from: "whatsapp:+14155238886",
      to: `whatsapp:+91${user.phone}`,
      body: "hello there Sachivalaya employee",
    })
    .then((message) => console.log(message));

  //deleting basket
  const emptyBasket = await Basket.findOneAndDelete({ userId: uid });

  res.status(StatusCodes.CREATED).json({
    res: "success",
    data: { "current balance": deduct.wallet, orderOtp: otp },
  });
};

const addRating = async (req, res) => {
  let { dishId, rating } = req.body;
  const dish = await Dish.findOne({ _id: dishId });
  if (!dish) {
    throw new BadRequestError("Invalid dish id");
  }
  if (dish.noOfRating === 0) {
    dish.rating = rating;
    dish.noOfRating += 1;
  } else {
    dish.rating = (
      (dish.rating * dish.noOfRating + rating) /
      (dish.noOfRating + 1)
    ).toFixed(1);
    dish.noOfRating += 1;
  }
  const Updated = await Dish.findOneAndUpdate({ _id: dishId }, dish, {
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  });

  res.status(StatusCodes.OK).json({ res: "success", data: Updated });
};

const validatePaymentOtp = async (req, res) => {
  var { otp } = req.body;
  const { uid } = req.params;

  otp = parseInt(otp);
  if (!otp) {
    throw new BadRequestError("Please Provide OTP");
  }
  if (!uid) {
    throw new BadRequestError("Please Provide user id");
  }
  const order = await Order.findOne({ userId: uid, status: "NEW" });
  if (!order) {
    throw new BadRequestError("Please Provide Valid user id");
  }
  if (otp !== order.otp) {
    throw new BadRequestError("wrong otp");
  }
  const newOrder = await Order.findOneAndUpdate(
    { userId: uid, status: "NEW" },
    { status: "COMPLETED" },
    { runValidators: true, new: true }
  );
  res.status(StatusCodes.OK).json({ res: "success", data: newOrder });
};

const showActiveSubscriptions = async (req, res) => {
  const userId = req.params.uid;
  //most recent subscription
  const subs = await Subscription.find({ userId,status:"ACTIVE" }).sort({ createdAt: -1 });

  for (let i = 0; i < subs.length; i++) {
    const dish = await Dish.findOne({_id:subs[i].dishId});
    const obj ={}
    obj.quantity = subs[i].quantity;
    obj.dish = dish;
    subs[i] = obj;
  }
  res.status(StatusCodes.OK).json({ res: "success", data: subs });
};
const showExpiredSubscriptions = async (req, res) => {
  const userId = req.params.uid;
  //most recent subscription
  const subs = await Subscription.find({ userId,status:"EXPIRED" }).sort({ createdAt: -1 });

  for (let i = 0; i < subs.length; i++) {
    const dish = await Dish.findOne({_id:subs[i].dishId});
    const obj ={}
    obj.quantity = subs[i].quantity;
    obj.dish = dish;
    subs[i] = obj;
  }
  res.status(StatusCodes.OK).json({ res: "success", data: subs });
};

const buySubscription = async(req,res)=>{
  const {uid} = req.params;
  const {dishId} = req.body;

  const user = await User.findOne({_id:uid});
  const dish = await Dish.findOne({_id:dishId,subscriptionAvailable:true});
  if(!dish)
  {
    throw new NotFoundError("this dish is not available for subscription");
  }
  const price = dish.price * 30;
  if(user.wallet >= price)
  {
    const deduct = await User.findOneAndUpdate({_id:uid},{wallet:user.wallet-price},{ new:true });
    const subs = await Subscription.find({})
    let subscription_id = subs.length+1
    const sub = await Subscription.create({dishId,userId:uid,username:user.name,subscription_id});
    res.status(StatusCodes.OK).json({res:"success",data:sub})
  }
  else
  {
    res.status(StatusCodes.OK).json({res:"fail",data:abs(user.wallet-price)})
  }

}
const twilioWebhook = async (req, res) => {
  console.log(req.body);
  res.status(StatusCodes.OK).json({ res: "success", data: req.body });
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
  removeItem,
  canPayWallet,
  payCanteen,
  addRating,
  updateUserDetails,
  updatePassword,
  validateOTP,
  validatePaymentOtp,
  createOrder,
  twilioWebhook,
  showActiveSubscriptions,
  showExpiredSubscriptions,
  buySubscription,
};
