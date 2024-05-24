const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);
const YOUR_DOMAIN = "https://creative-school-design.onrender.com";

// Assuming the amount is passed in the request body
async function paymentController(req, res) {
  const { classname, price, image } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: classname,
              image: image,
            },
            unit_amount: price * 100,
          },
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}?success=true`,
      cancel_url: `${YOUR_DOMAIN}?canceled=true`,
    });

    res.redirect(303, session.url);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

module.exports = paymentController;
