const express = require("express");
const router = express.Router();

const {
  registrationController,
  allUserController,
  beAdminController,
  beStudentController,
  beInstructorController,
} = require("../../controllers/registrationController");
const loginController = require("../../controllers/loginController");
const logoutController = require("../../controllers/logoutController");

router.post("/registration", registrationController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.get("/allusers", allUserController);
router.post("/beadmin", beAdminController);
router.post("/bestudent", beStudentController);
router.post("/beinstructor", beInstructorController);

module.exports = router;
