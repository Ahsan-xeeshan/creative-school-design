const stripe = require("stripe")(process.env.SECRET_STRIPE_KEY);

// Assuming the amount is passed in the request body
async function paymentController(req, res) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.item.map((item) => {
        return {
          price_data: {
            currency: "usd",
            course_data: {
              classname: item.classname,
              image: item.image,
            },
            unit_amount: item.price * 100,
          },
        };
      }),
      success_url: [
        "https://creative-design-school.vercel.app/dashboard/enrolled-classes",
        "http://localhost:5173/dashboard/enrolled-classes",
      ],
      cancle_url: [
        "https://creative-design-school.vercel.app/dashboard/selected-classes",
        "http://localhost:5173/dashboard/selected-classes",
      ],
    });
    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = paymentController;
