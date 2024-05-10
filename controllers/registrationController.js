const bcrypt = require("bcrypt");
const UserList = require("../models/userSchema");
const userSchema = require("../models/userSchema");

async function registrationController(req, res) {
  const { username, email, image, password, confirmpassword, role } = req.body;

  if (!username) {
    return res.json({ error: "Name is required" });
  }
  if (!email) {
    return res.json({ error: "Email is required" });
  }
  if (password !== confirmpassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  const existingEmail = await UserList.find({ email });

  if (existingEmail.length > 0) {
    res.json({ error: "This email is already used" });
  }
  // var token = jwt.sign({ email }, "xeeshan");
  bcrypt.hash(password, 10, function (err, hash) {
    const users = new UserList({
      username,
      email,
      image,
      password: hash,
      role,
    });
    users.save();
    // var token = jwt.sign({ email }, "xeeshan");

    // res.send(users);
    res.send({
      success: "Registration Successfully done.",
    });
  });
}

async function allUserController(req, res) {
  const data = await userSchema.find({});
  res.send(data);
}

async function beAdminController(req, res) {
  const { id } = req.body;
  const updaterole = await userSchema.findByIdAndUpdate(
    { _id: id },
    { role: "admin" },
    { new: true }
  );
  res.json(updaterole);
}
async function beStudentController(req, res) {
  const { id } = req.body;
  const updaterole = await userSchema.findByIdAndUpdate(
    { _id: id },
    { role: "student" },
    { new: true }
  );
  res.json(updaterole);
}
async function beInstructorController(req, res) {
  const { id } = req.body;
  const updaterole = await userSchema.findByIdAndUpdate(
    { _id: id },
    { role: "instructor" },
    { new: true }
  );
  res.json(updaterole);
}
module.exports = {
  registrationController,
  allUserController,
  beAdminController,
  beStudentController,
  beInstructorController,
};
