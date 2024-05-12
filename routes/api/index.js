const express = require("express");
const router = express.Router();

const authRouter = require("./authentication");
const classRouter = require("./class");
const paymentRouter = require("./payment");

router.use("/authentication", authRouter);
router.use("/classes", classRouter);
router.use("/checkout", paymentRouter);

module.exports = router;
