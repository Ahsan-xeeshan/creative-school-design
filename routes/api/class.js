const express = require("express");

const router = express.Router();
const {
  createClassController,
  allClassController,
  updateFeedbackController,
  classAcceptController,
  classRejectController,
  updateClassController,
  deleteClassController,
} = require("../../controllers/createClassController.js");
const instructorCardController = require("../../controllers/instructorCardController.js");

router.post("/createclass", createClassController);
router.get("/allclasses", allClassController);
router.get("/myclasses", instructorCardController);
router.post("/updatefeedback", updateFeedbackController);
router.post("/classaccept", classAcceptController);
router.post("/classreject", classRejectController);
router.post("/updateclass/:id", updateClassController);
router.delete("/deleteclass/:id", deleteClassController);

module.exports = router;
