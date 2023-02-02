const Users = require('../models/User')

const stripe = require("stripe")(
  "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"
);
const endpointSecret = "whsec_fb5686e7f586c42bd82e5e7a0839f44d5dd6c582ee7cf1fcce0f7be84d306fa1";
const pubkey = "pk_live_51KyqwvSFXhJBixXAkcyirlXABSuwuQoC9a6daIFPkc7mrRotk18Xe1eISkB7tFR1krgUbuw8FY6SQxvmTx9ZZ89100S4jkwTWc";

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

module.exports = {paymentsheet,webhook}
