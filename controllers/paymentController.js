const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

// Assuming the amount is passed in the request body
async function paymentController(req, res) {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_option: [
        { shipping_rate: "shr_1PJglSAivobkXwZsE3kczdGA" },
        { shipping_rate: "shr_1PJgncAivobkXwZsO5ZODteX" },
      ],
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "{{PRICE_ID}}",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    };
    const session = await stripe.checkout.sessions.create(params);

    res.redirect(303, session.url);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

module.exports = paymentController;
