const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

// Assuming the amount is passed in the request body
async function paymentController(req, res) {
  try {
    const params = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      // shipping_option: [
      //   { shipping_rate: "shr_1PJglSAivobkXwZsE3kczdGA" },
      //   { shipping_rate: "shr_1PJgncAivobkXwZsO5ZODteX" },
      // ],
      line_items: {
        price_data: {
          currency: "usd",
          product_data: {
            classImage: req.body.item.image,
            courseName: req.body.item.classname,
          },
          unit_amount: req.body.item.price * 100,
        },
      },

      success_url: `https://creative-design-school.vercel.app?success=true`,
      cancel_url: `https://creative-design-school.vercel.app/?canceled=true`,
    };
    const session = await stripe.checkout.sessions.create(params);

    res.redirect(303, session.url);
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
}

module.exports = paymentController;
