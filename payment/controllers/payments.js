const Users = require('../models/User')

const stripe = require("stripe")(
  "sk_test_51KyqwvSFXhJBixXAbp2HBSBo65HD0T1BqG60ABDZrLJnFBWonmCw1KCdHIFVFG7TDYkE0qCZs6BORYhBSQX3be5g00hRtIdRtI"
);
const endpointSecret = "whsec_fb5686e7f586c42bd82e5e7a0839f44d5dd6c582ee7cf1fcce0f7be84d306fa1";
const pubkey = "pk_test_51KyqwvSFXhJBixXADhCK7QcvopmkFSi5zg7i2wFLoGvFHYXNb2waPBALIHBoj6ONtR9mZMRAYAi5f5wurs14H1cL00mKeQfwrs";

const paymentsheet = async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  var { customerId, userId } = req.body;
  if (customerId === null || customerId === "") {
    var customer = await stripe.customers.create();
    const updateUser = await Users.findOneAndUpdate({_id:userId},{customerId:customer.id},{runValidators:true,new:true})
    customerId = customer.id;
  }
  const customerBasket = await Basket.find({ _id: userId });

  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customerId },
    { apiVersion: "2020-08-27" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: customerBasket.price * 100,
    currency: "inr",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.status(200).json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
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
  res.send();
};

module.exports = {paymentsheet,webhook}
