const stripe = require("stripe")(
  "sk_test_51PFi5QAivobkXwZsHVIIRZcAw8Wo3o3lwFouSy4Iw9UxHRxJs11HmY99nq0aU66ulJBC0zvcnkJjVcXZgfEU6P72001NHkWuIH"
);

// Assuming the amount is passed in the request body
async function paymentController(req, res) {
  const { price } = req.body.item;

  // Create a PaymentIntent with the dynamic amount
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price, // amount is in cents
    currency: "usd",
  });

  // Retrieve the client secret from the PaymentIntent
  const clientSecret = paymentIntent.client_secret;

  // Pass the client secret to your frontend code
  res.json({ clientSecret });
}

module.exports = paymentController;
