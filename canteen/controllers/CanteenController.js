const Order = require("../models/Orders");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getCurrentOrders = async (req, res) => {
  // console.log('Request Received')
  const order = Order.find({ status: "NEW" });
  order.sort("_id");
  const orders = await order;
  // console.log('Orders: ', orders)
  setTimeout(() => {
    let k = 0;
    let data = [];
    orders.forEach(async (order) => {
      let j = 0;
      let arr = [];
      for (let i = 0; i < order.items.length; i++) {
        const dishname = await Dish.findOne({ _id: order.items[i].dishId });
        arr[j] = { qty: order.items[i].qty, dishName: dishname.name };
        //  console.log(arr)
        j++;
      }
      let obj = { res: "Success", data: order, items: arr };
      if (obj.data.button === false) {
        const user = await User.findOne({ _id: obj.data.userId });
        obj.userdetail = { username: user.name };
      } else {
        obj.userdetail = { username: "Guest" };
      }
      data[k] = obj;
      //console.log(data)
      k++;
    });
    setTimeout(() => {
      res.status(StatusCodes.OK).json({ res: "Success", data: data });
    }, 1000);
  }, 100);
};

const getHistoryOrders = async (req, res) => {
  // console.log('Request Received')
  const orders = await Order.find({ status: "COMPLETED" });
  // console.log('Orders: ', orders)
  let k = 0;
  let data = [];
  orders.forEach(async (order) => {
    let j = 0;
    let arr = [];
    for (let i = 0; i < order.items.length; i++) {
      const dishname = await Dish.findOne({ _id: order.items[i].dishId });
      arr[j] = { qty: order.items[i].qty, dishName: dishname.name };
      //  console.log(arr)
      j++;
    }
    let obj = { res: "Success", data: order, items: arr };
    if (obj.data.button === false) {
      const user = await User.findOne({ _id: obj.data.userId });
      obj.userdetail = { username: user.name };
    } else {
      obj.userdetail = { username: "Guest" };
    }
    data[k] = obj;
    //console.log(data)
    k++;
  });
  setTimeout(() => {
    res.status(StatusCodes.OK).json({ res: "Success", data: data });
  }, 1000);
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
module.exports = {
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
