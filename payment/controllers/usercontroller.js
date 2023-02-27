const Order = require("../models/Orders");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const Subscription = require("../models/Subscription");
const Basket = require("../models/Basket");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError,NotFoundError } = require("../errors/index");
const nodemailer = require("nodemailer");
require("dotenv").config();

const stripe = require("stripe")(
  "sk_test_51MahAbSFY3NUTfznUgvTw3nFg2433V4oodPAZFDfk5WHRLTXEFfmUlNn9qJxYFTXuVAJj3958YQDVHevePnuVLue00RzmXNgfG"
);

const registerUser = async (req, res) => {
  const { name, email, password, address } = req.body;
  if (!email || !name || !password || !address) {
    throw new BadRequestError("Please provide necessary credentials");
  }
  const userx = await User.findOne({email:req.body.email})
  if(userx){
    throw new BadRequestError("This Email already Exists");
  }
  if(req.body.password.length<8){
    throw new BadRequestError("Minimum size of password should be 8");
  }
  req.body.wallet = 5000;
  const customer = await stripe.customers.create({
    email:email,name:name
  });
  req.body.customerId = customer.id;
  const user = await User.create(req.body);
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, id: user._id }, token });
};

const forgotPasswordUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    throw new BadRequestError("Please provide email");
  }
  const otp = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
  const user = await User.findOneAndUpdate(
    { email: email },
    { otp: otp },
    { new: true, runValidators: true }
  );
  if (!user) {
    throw new BadRequestError("Please provide valid email");
  }


  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
      ciphers: "SSLv3",
    },
    auth: {
      user: "hetpatel5542@gmail.com",
      pass: "xivslyvrfcrgewtb",
    },
  });

  const mailOptions = {
    from: '"Sachivalaya " <ssip69@outlook.com>', // sender address (who sends)
    to: `${email}`, // list of receivers (who receives)
    subject: "OTP for Reseting Your User App Password ", // Subject line
    text: `Your OTP for reseting the password for User app is ${otp}, please enter this OTP in your User app to reset your password.
-Thanks,
Team Sachivalaya  `, // plaintext body
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return console.log(error);
    }

    res.status(StatusCodes.OK).json({ otpsent: true });
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, id: user._id }, token });
};

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
    const idli = await Dish.findOne({ name: "Idli Sambhar" });

    for (let i = 0; i < orders.length; i++) {
      var items = orders[i].items;
      var updatedItems = [];
      for (let j = 0; j < items.length; j++) {
        const dish = await Dish.findOne({ _id: items[j].dishId });
        if (!dish) {
          var obj = { qty: items[j].qty, idli };
        } else {
          var obj = { qty: items[j].qty, dish };
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
  var currentTime = new Date();

  var currentOffset = currentTime.getTimezoneOffset();

  var ISTOffset = 330; // IST offset UTC +5:30

  var ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  const time = ISTTime.getHours();
  const basket = await Basket.findOne({ userId: uid });
  if (!basket) {
    throw new NotFoundError("Invalid user id, could not find basket");
  }
  var items = basket.items;
  console.log(items);
  items.forEach(async (e) => {
    let obj = {};
    const dish = await Dish.findOne({ _id: e.dishId, isAvailable: true });
    //if the dish is not available
    if (!dish) {
      const d = await Dish.findOne({ _id: e.dishId });
      console.log(time);
      if (time >= 9 && time < 12) {
        const slot1 = d.slot1 + e.qty;
        const update = await Dish.findOneAndUpdate(
          { _id: e.dishId },
          { slot1 }
        );
      } else if (time >= 12 && time < 15) {
        console.log(time);
        const slot2 = d.slot2 + e.qty;
        const update = await Dish.findOneAndUpdate(
          { _id: e.dishId },
          { slot2 }
        );
      } else {
        console.log("Hello from else");
        console.log(e.qty)
        let slot3 = d.slot3 + e.qty;
        slot3=Number(slot3)
        console.log(slot3)
        const update = await Dish.findOneAndUpdate(
          { _id: e.dishId },
          { slot3 },
          { new: true, runValidators: true }
        );
        console.log(update)
        console.log(update?.slot3);
      }
      res
        .status(StatusCodes.OK)
        .json({ res: "fail", data: "dish is not actually available" });
    } else {
      //if quantity is enough
      if (dish?.quantity >= e.qty) {
        obj.dishId = e.dishId;
        obj.qty = dish?.quantity - e.qty;
        if (obj.qty < 10) {
          const count = Math.abs(10 - obj.qty);
          if (time >= 9 && time <= 12) {
            const slot1 = dish.slot1 + count;
            const dish = await Dish.findOneAndUpdate(
              { _id: obj.dishId },
              { quantity: obj.qty, isAvailable: false, slot1 },
              { runValidators: true, new: true }
            );
          } else if (time >= 12 && time <= 15) {
            const slot2 = dish.slot2 + count;
            const dish = await Dish.findOneAndUpdate(
              { _id: obj.dishId },
              { quantity: obj.qty, isAvailable: false, slot2 },
              { runValidators: true, new: true }
            );
          } else {
            const slot3 = dish.slot3 + count;
            const dish = await Dish.findOneAndUpdate(
              { _id: obj.dishId },
              { quantity: obj.qty, isAvailable: false, s3 },
              { runValidators: true, new: true }
            );
          }
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
        if (!dish) {
          if (time >= 9 && time <= 12) {
            const count = e.qty - dish?.quantity;
            const slot1 = dish.slot1 + count;
            const update = await Dish.findOneAndUpdate(
              { _id: e.dishId },
              { slot1 }
            );
          } else if (time >= 12 && time <= 15) {
            const count = e.qty - dish?.quantity;
            const slot2 = dish.slot2 + count;
            const update = await Dish.findOneAndUpdate(
              { _id: e.dishId },
              { slot2 }
            );
          } else {
            const count = e.qty - dish?.quantity;
            const slot3 = dish.slot3 + count;
            const update = await Dish.findOneAndUpdate(
              { _id: e.dishId },
              { slot3 }
            );
          }
          res
            .status(StatusCodes.OK)
            .json({ res: "fail", data: "not enough quantity" });
        }
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
  const order = await Order.create(orderObj);
  
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
  const subs = await Subscription.find({ userId, status: "ACTIVE" }).sort({
    createdAt: -1,
  });

  for (let i = 0; i < subs.length; i++) {
    console.log(subs[i]);
    const dish = await Dish.findOne({ _id: subs[i].dishId });
    const obj = {};
    obj.quantity = subs[i].quantity;
    obj.dish = dish;
    obj.paymentmode = subs[i].paymentmode;
    obj.subscription_id = subs[i].subscription_id;
    subs[i] = obj;
  }
  res.status(StatusCodes.OK).json({ res: "success", data: subs });
};
const showExpiredSubscriptions = async (req, res) => {
  const userId = req.params.uid;
  //most recent subscription
  const subs = await Subscription.find({ userId, status: "EXPIRED" }).sort({
    createdAt: -1,
  });

  for (let i = 0; i < subs.length; i++) {
    const dish = await Dish.findOne({ _id: subs[i].dishId });
    const obj = {};
    obj.quantity = subs[i].quantity;
    obj.dish = dish;
    obj.paymentmode = subs[i].paymentmode;
    obj.subscription_id = subs[i].subscription_id;

    subs[i] = obj;
  }
  res.status(StatusCodes.OK).json({ res: "success", data: subs });
};

const buySubscription = async (req, res) => {
  const { uid } = req.params;
  const { dishId } = req.body;

  const user = await User.findOne({ _id: uid });
  const dish = await Dish.findOne({ _id: dishId, subscriptionAvailable: true });
  if (!dish) {
    throw new NotFoundError("this dish is not available for subscription");
  }
  const price = dish.price * 30;
  if (user.wallet >= price) {
    const deduct = await User.findOneAndUpdate(
      { _id: uid },
      { wallet: user.wallet - price },
      { new: true }
    );
    const subs = await Subscription.find({});
    let subscription_id = subs.length + 1;
    const sub = await Subscription.create({
      dishId,
      userId: uid,
      username: user.name,
      subscription_id,
      paymentmode: "KOT",
    });
    res.status(StatusCodes.OK).json({ res: "success", data: sub });
  } else {
    res
      .status(StatusCodes.OK)
      .json({ res: "fail", data: Math.abs(user.wallet - price) });
  }
};
const getSubscriptions = async (req, res) => {
  const subs = await Dish.find({ subscriptionAvailable: true });
  res.status(StatusCodes.OK).json({ res: "success", data: subs });
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
  showActiveSubscriptions,
  showExpiredSubscriptions,
  buySubscription,
  getSubscriptions,
  getDish,
  registerUser,
  loginUser,
  forgotPasswordUser
};
