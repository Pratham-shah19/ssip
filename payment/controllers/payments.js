const Users = require('../models/User')
const Canteen = require('../models/Canteen')
const Basket = require('../models/Basket')
const Dish= require('../models/Dish')
const Orders = require("../models/Orders")

const stripe = require("stripe")(
  "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"
);
const endpointSecret = "whsec_fb5686e7f586c42bd82e5e7a0839f44d5dd6c582ee7cf1fcce0f7be84d306fa1";
const pubkey = "pk_live_51KyqwvSFXhJBixXAkcyirlXABSuwuQoC9a6daIFPkc7mrRotk18Xe1eISkB7tFR1krgUbuw8FY6SQxvmTx9ZZ89100S4jkwTWc";


const createcheckoutsession = async(req, res) => {
  const product = await stripe.products.create({
    name:req.body.date, 
  })
  const price = await stripe.prices.create({
    unit_amount:req.body.amount * 100,
    currency:'inr',
    product:product.id
  })
  
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: price.id,
        quantity: 1,
      },
      
    ],
    mode: "payment",
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });
  
  res.redirect(303, session.url);
};
//mobile pg integration
const paymentsheet = async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  var { price, userId } = req.body;
  const customer = await Users.findOne({_id:userId})

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
    publishableKey:pubkey,
  });
};

const payCanteen = async (req, res) => {
    const { customer ,amount_total} = req.body;
    const user = await Users.findOne({ customerId: customer });
    if (!user) {
      throw new BadRequestError("Invalid userid");
    }
  
    //adding coins to canteen's wallet
    const canteen = await Canteen.findOne({ name: 'Sachivalaya' });
    if (!canteen) {
      console.log("canteen not found");
      throw new BadRequestError("Invalid caneteen name");

    }
    const pay = await Canteen.findOneAndUpdate(
      { name: 'Sachivalaya'},
      { onlinewallet: canteen.onlinewallet + amount_total/100 },
      { new: true, runValidators: true }
    );
    const basket = await Basket.findOne({ userId: user._id });
    if (!basket) {
      console.log("basket not present");
      throw new BadRequestError("Invalid user id, could not find basket");
      return;
    }
    var arr = [];
    var items = basket.items;
    items.forEach(async (e) => {
      let obj = {};
      const dish = await Dish.findOne({ _id: e.dishId, isAvailable: true });
      if (!dish) {
        console.log("dish not available");
        res
          .status(StatusCodes.OK)
          .json({ res: "fail", data: "dish is not actually available" });
      } else {
        if (dish?.quantity >= e.qty) {
          obj.dishId = e.dishId;
          obj.qty = dish?.quantity - e.qty;
          if (obj.qty < 10) {
            const dish = await Dish.findOneAndUpdate(
              { _id: obj.dishId },
              { quantity: obj.qty, isAvailable: false },
              { runValidators: true, new: true }
            );
            console.log("less quantity", dish);
          } else {
            const dish = await Dish.findOneAndUpdate(
              { _id: obj.dishId },
              { quantity: obj.qty },
              { runValidators: true, new: true }
            );
            console.log("enough quantity", dish);
          }
        } else {
          res
            .status(StatusCodes.OK)
            .json({ res: "fail", data: "not enough quantity" });
        }
      }
    });
  
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
    const emptyBasket = await Basket.findOneAndDelete({ userId: user._id });
  
    res.status(StatusCodes.CREATED).json({
      res: "success",
      data: { "current balance": deduct.wallet, orderOtp: otp },
    });
  };
const webhook = async (req, res) => {
  let event = req.body;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers["stripe-signature"];
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
  }

  // Handle the event
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      payCanteen(req,res)
      break;
    case "payment_method.attached":
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).send("order placed");
};

module.exports = {paymentsheet,webhook,createcheckoutsession}
