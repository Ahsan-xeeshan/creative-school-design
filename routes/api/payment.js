const express = require("express");
const router = express.Router();
const paymentController = require("../../controllers/paymentController");

router.post("/confirmpayment", paymentController);
module.exports = router;
