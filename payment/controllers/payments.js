const Users = require("../models/User");
const Canteen = require("../models/Canteen");
const Basket = require("../models/Basket");
const Dish = require("../models/Dish");
const Orders = require("../models/Orders");
const Subscription = require("../models/Subscription");
const { StatusCodes } = require("http-status-codes");

const stripe = require("stripe")(
  "sk_test_51MahAbSFY3NUTfznUgvTw3nFg2433V4oodPAZFDfk5WHRLTXEFfmUlNn9qJxYFTXuVAJj3958YQDVHevePnuVLue00RzmXNgfG"
);
const endpointSecret =
  "whsec_fb5686e7f586c42bd82e5e7a0839f44d5dd6c582ee7cf1fcce0f7be84d306fa1";
const pubkey =
  "pk_test_51MahAbSFY3NUTfznmKygjsiCK1qiRw22x3OdaPHzGvntkEKomwfjnQHUn9IHhK3v8GDjEDgMxwBqLmI5HievHS9200Dp6JiXWq";

const YOUR_DOMAIN = "http://localhost:3000"; //put react's port number...

const createcheckoutsession = async (req, res) => {
  const canteen = await Canteen.find({});
  const wallet = canteen[0].wallet;
  var date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  date = day + "/" + month + "/" + year;
  const product = await stripe.products.create({
    name: date,
  });
  const price = await stripe.prices.create({
    unit_amount: wallet * 100,
    currency: "inr",
    product: product.id,
  });

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}?success=true`,
    cancel_url: `${YOUR_DOMAIN}?canceled=true`,
  });
  res.redirect(303, session.url);
};

//mobile pg integration
const paymentsheet = async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  var { price, userId } = req.body;
  const customer = await Users.findOne({ _id: userId });

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.customerId },
    { apiVersion: "2020-08-27" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price * 100,
    currency: "inr",
    customer: customer.customerId,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.status(200).json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.customerId,
    publishableKey: pubkey,
  });
};

const payCanteen = async (req, res) => {
  const { uid } = req.params;
  //canteen
  const canteen = await Canteen.findOne({ name: "Sachivalaya" });
  //user basket
  const basket = await Basket.findOne({ userId: uid });
  const price = basket?.price;
  //adding coins to canteen's wallet
  const pay = await Canteen.findOneAndUpdate(
    { name: "Sachivalaya" },
    { wallet: canteen.onlinewallet + price },
    { new: true, runValidators: true }
  );
  //generating otp
  const otp = Math.floor(Math.random() * 10000);
  const orderObj = {};
  orderObj.items = basket.items;
  orderObj.userId = basket.userId;
  orderObj.price = price;
  orderObj.otp = otp;
  orderObj.paymentmode = "ONLINE";
  //creating order
  const order = await Orders.create(orderObj);
  //deleting basket
  const emptyBasket = await Basket.findOneAndDelete({ userId: uid });
  console.log(otp);
  res.status(StatusCodes.CREATED).json({
    res: "success",
    data: { orderOtp: otp },
  });
};

const buySubscription = async (req, res) => {
  const { uid } = req.params;
  const { dishId, paymentmode ,amount} = req.body;
  const user = await Users.findOne({_id:uid});
  var canteen = await Canteen.findOne({name:"Sachivalaya"})
  if(paymentmode==='KOT+ONLINE')
  {
    const updateuser = await Users.findOneAndUpdate({_id:uid},{wallet:0})
    const update = await Canteen.findOneAndUpdate({name:"Sachivalaya"},{wallet:canteen.wallet+user.wallet,onlinewallet:canteen.wallet+amount})
  }
  else
  {
    const update = await Canteen.findOneAndUpdate({name:"Sachivalaya"},{onlinewallet:canteen.wallet+amount})
  }

  const subs = await Subscription.find({});
  let subscription_id = subs.length + 1;
  const sub = Subscription.create({
    dishId:dishId,
    userId: uid,
    username: user.name,
    subscription_id,
    paymentmode,
  });
  res.status(StatusCodes.OK).json({res:"success",data:sub})
};

//webhook jugaad for normal payment
const completeOnlinePayment = async (req, res) => {
  const { uid } = req.params;
  const customer = await Users.findOne({ _id: uid });
  var payment_intent = await stripe.paymentIntents.list({
    customer: customer.customerId,
  });
  while (
    payment_intent.data[0].status != "succeeded" &&
    payment_intent.data[0].status != "canceled"
  ) {
        payment_intent = await stripe.paymentIntents.list({
          customer: customer.customerId,
        });
      }
      console.log(payment_intent.data[0].status);
      if (payment_intent.data[0].status === "succeeded") {
        payCanteen(req, res);
      } else {
        res.status(StatusCodes.OK).json({ res: "fail", data: "Online payment failed" });
      }
};
//webhook jugaad for subscription
const completeOnlinePaymentSubscription = async (req, res) => {
  const { uid } = req.params;
  const customer = await Users.findOne({ _id: uid });
  var payment_intent = await stripe.paymentIntents.list({
    customer: customer.customerId,
  });
  while (
    payment_intent.data[0].status != "succeeded" &&
    payment_intent.data[0].status != "canceled"
  ) {
    payment_intent = await stripe.paymentIntents.list({
      customer: customer.customerId,
    });
    console.log(payment_intent.data[0].status);
  }
  if (payment_intent.data[0].status === "succeeded") {
    buySubscription(req, res);
  } else {
    res
      .status(StatusCodes.OK)
      .json({ res: "fail", data: "Online payment for subscription failed" });
  }
};

module.exports = {
  paymentsheet,
  createcheckoutsession,
  completeOnlinePayment,
  completeOnlinePaymentSubscription,
};
