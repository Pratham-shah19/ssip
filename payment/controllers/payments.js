const Users = require("../models/User");
const Canteen = require("../models/Canteen");
const Basket = require("../models/Basket");
const Dish = require("../models/Dish");
const Orders = require("../models/Orders");
const { StatusCodes } = require("http-status-codes");

const stripe = require("stripe")(
  "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"
);
const endpointSecret =
  "whsec_fb5686e7f586c42bd82e5e7a0839f44d5dd6c582ee7cf1fcce0f7be84d306fa1";
const pubkey =
  "pk_live_51KyqwvSFXhJBixXAkcyirlXABSuwuQoC9a6daIFPkc7mrRotk18Xe1eISkB7tFR1krgUbuw8FY6SQxvmTx9ZZ89100S4jkwTWc";

const YOUR_DOMAIN = "http://localhost:6990"; //put react's port number...


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
  const price = basket.price;
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

  res.status(StatusCodes.CREATED).json({
    res: "success",
    data: { orderOtp: otp }
  });
};

const completeOnlinePayment = async(req,res)=>{
  const {uid} = req.params;
  const customer = await Users.findOne({_id:uid})
  var payment_intent = await stripe.paymentIntents.list({customer:customer.customerId})
  while(payment_intent.data[0].status !='succeeded' && payment_intent.data[0].status!='canceled')
  {
    payment_intent = await stripe.paymentIntents.list({customer:customer.customerId})
    console.log(payment_intent.data[0].status)

  }
  if(payment_intent.data[0].status === 'succeeded')
  {
    payCanteen(req,res)

  }
  else
  {
    res.status(StatusCodes.OK).json({res:"fail",data:"Online payment failed"})
  }

}


module.exports = { paymentsheet, createcheckoutsession ,completeOnlinePayment};
