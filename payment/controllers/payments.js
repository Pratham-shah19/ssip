const Users = require("../models/User");
const Canteen = require("../models/Canteen");
const Basket = require("../models/Basket");
const Dish = require("../models/Dish");
const Orders = require("../models/Orders");

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
  const user = await Users.findOne({ _id: uid });
  //canteen
  const canteen = await Canteen.findOne({ name: "Sachivalaya" });
  //user basket
  const basket = await Basket.findOne({ userId: uid });
  const price = basket.price;
  //deducting price from user's wallet
  const deduct = await Users.findOneAndUpdate(
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
  //deleting basket
  const emptyBasket = await Basket.findOneAndDelete({ userId: uid });

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
      payCanteen(req, res);
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

module.exports = { paymentsheet, webhook, createcheckoutsession };
