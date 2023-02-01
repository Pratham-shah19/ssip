const express = require("express");
const app = express();
const stripe = require("stripe")(
  "sk_test_51KyqwvSFXhJBixXAbp2HBSBo65HD0T1BqG60ABDZrLJnFBWonmCw1KCdHIFVFG7TDYkE0qCZs6BORYhBSQX3be5g00hRtIdRtI"
);
// This example sets up an endpoint using the Express framework.
// Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

app.post("/payment-sheet", async (req, res) => {
  // Use an existing Customer ID if this is a returning customer.
  const { cus_id } = req.body;
  if (!cus_id) {
    var customer = await stripe.customers.create();
  }
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2020-08-27" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 100,
    currency: "inr",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey:
      "pk_test_51KyqwvSFXhJBixXADhCK7QcvopmkFSi5zg7i2wFLoGvFHYXNb2waPBALIHBoj6ONtR9mZMRAYAi5f5wurs14H1cL00mKeQfwrs",
  });
});
