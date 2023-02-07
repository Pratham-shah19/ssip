const Order = require("../models/Orders");
const User = require("../models/User");
const Dish = require("../models/Dish");
const Canteen = require("../models/Canteen");
const mime = require('mime')
const xl = require('excel4node')
const path = require('path')
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const stripe = require('stripe')('sk_test_51KyqwvSFXhJBixXAbp2HBSBo65HD0T1BqG60ABDZrLJnFBWonmCw1KCdHIFVFG7TDYkE0qCZs6BORYhBSQX3be5g00hRtIdRtI');



const getCurrentOrders = async (req, res) => {
  // console.log('Request Received')
  const order = Order.find({ status: "NEW" });
  order.sort("-_id");
  var timeout = 1000;
  const orders = await order;
  if(orders.length >=40 && orders.length <=80)
  {
    timeout = 5000;
  }
  else{
    timeout =  2000;
  }
  var k = 0;
  var data = [];
  setTimeout(() => {
    orders.forEach(async (order) => {
      let j = 0;
      let arr = [];
      for (let i = 0; i < order.items.length; i++) {
        const dishname = await Dish.findOne({ _id: order.items[i].dishId });
        arr[j] = { qty: order.items[i].qty, dishName: dishname.name };
        //  console.log(arr)
        j++;
      }
      let obj = {orderdetail: order, items: arr };
      if (obj.orderdetail.button === false) {
        const user = await User.findOne({ _id: obj.orderdetail.userId });
        obj.userdetail = { username: user.name };
      } else {
        obj.userdetail = { username: "Guest" };
      }
      data[k] = obj;
      //console.log(data)
      k++;
    });
    setTimeout(()=>{
      res.status(StatusCodes.OK).json({ res: "Success",length:data.length, data: data });

    },timeout)
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
  req.body.paymentmode = 'CASH';
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
    images:[imageUrl],
    description:category
  });
  const priceid  = await stripe.prices.create({
    unit_amount: price*100,
    currency: 'inr',
    product: product.id,
  })
  req.body.priceId = priceid.id
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

const lastReportGeneration = async (req,res) => {
  let i=0;
  const order = await Order.find({status:"COMPLETED"});
  let currentMonth = new Date().getMonth();
  currentMonth++;
  let currentYear = new Date().getFullYear();
  if(currentMonth == 1){
    currentMonth=13;
    currentYear-=1;
  } 
  let arr= [];
  let headerColumns = ['Order ID','Customer\'s Name','Total Price','Quantity','Payment Mode']
  order.forEach(async (ord)=>{
    const d = new Date(ord._id.getTimestamp());
    const dMonth = d.getMonth() + 1;
    const dYear = d.getFullYear();
    if(currentYear == dYear && currentMonth-dMonth==1){
      let obj = {};
      let user = await User.findOne({_id:ord.userId})
      obj.orderid = ord._id;
      obj.username = user.name;
      obj.price = ord.price;
      let qty=0;
      ord.items.forEach((item)=>{
        qty+=item.qty;
      })
      obj.qty = qty;
      obj.paymentmode = ord.paymentmode;
      
      arr[i] = obj;
      i++;
    }
    
  })
  setTimeout(()=>{
    
  const wb = new xl.Workbook()
    const ws = wb.addWorksheet("REPORT")
    let colIndex = 1
    headerColumns.forEach((item) => {
        ws.cell(1, colIndex++).string(item)
    })
    let rowIndex = 2;
    arr.forEach((item) => {
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
            ws.cell(rowIndex, columnIndex++).string(item[colName].toString())
        })
        rowIndex++;
    })
    wb.write(`./controllers/lastMonthReport.xlsx`)
    const file = __dirname + "/lastMonthReport.xlsx"
    const fileName = path.basename(file)
    const mimeType = mime.getType(file)
    res.setHeader("Content-Disposition", "attachment;filename=" + fileName)
    res.setHeader("Content-Type", mimeType)
    setTimeout(() => {
        res.download(file)
    }, 2000);
  },1000)
  
  
}
const thisReportGeneration = async (req,res) => {
  let i=0;
  const order = await Order.find({status:"COMPLETED"});
  let currentMonth = new Date().getMonth();
  currentMonth++;
  let currentYear = new Date().getFullYear();
  let arr= [];
  let headerColumns = ['Order ID','Customer\'s Name','Total Price','Quantity','Payment Mode']
  order.forEach(async (ord)=>{
    const d = new Date(ord._id.getTimestamp());
    const dMonth = d.getMonth() + 1;
    const dYear = d.getFullYear();
    console.log(dMonth)
    if(currentYear == dYear && currentMonth-dMonth==0){
      let obj = {};

      console.log(ord)
      let user = await User.findOne({_id:ord.userId})
      console.log(user)
      obj.orderid = ord._id;
      obj.username = user?.name;
      obj.price = ord.price;
      let qty=0;
      ord.items.forEach((item)=>{
        qty+=item.qty;
      })
      obj.qty = qty;
      obj.paymentmode = ord.paymentmode;
      
      arr[i] = obj;
      i++;
    }
    
  })
  setTimeout(()=>{
    
  const wb = new xl.Workbook()
    const ws = wb.addWorksheet("REPORT")
    let colIndex = 1
    headerColumns.forEach((item) => {
        ws.cell(1, colIndex++).string(item)
    })
    let rowIndex = 2;
    arr.forEach((item) => {
        let columnIndex = 1;
        Object.keys(item).forEach((colName) => {
            ws.cell(rowIndex, columnIndex++).string(item[colName]?.toString())
        })
        rowIndex++;
    })
    wb.write(`./controllers/thisMonthReport.xlsx`)
    const file = __dirname + "/thisMonthReport.xlsx"
    const fileName = path.basename(file)
    const mimeType = mime.getType(file)
    res.setHeader("Content-Disposition", "attachment;filename=" + fileName)
    res.setHeader("Content-Type", mimeType)
    setTimeout(() => {
        res.download(file)
    }, 2000);
  },1000)
  
  
}
module.exports = {
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
