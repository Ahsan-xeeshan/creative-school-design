const express = require("express");
const router = express.Router();

const authRouter = require("./authentication");
const classRouter = require("./class");

router.use("/authentication", authRouter);
router.use("/classes", classRouter);

module.exports = router;
