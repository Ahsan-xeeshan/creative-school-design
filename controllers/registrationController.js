const bcrypt = require("bcrypt");
const UserList = require("../models/userSchema");
const userSchema = require("../models/userSchema");

async function registrationController(req, res) {
  let emailInput = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  let passwordInput =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  const { username, email, image, password, confirmpassword, role } = req.body;

  if (!username) {
    return res.json({ error: "Name is required" });
  }
  if (!email) {
    return res.json({ error: "Email is required" });
  } else if (!emailInput.test(email)) {
    return res.json({ error: "Name is Invalid" });
  }
  if (!image) {
    return res.json({ error: "Photo URL is required" });
  }
  if (!password) {
    return res.json({ error: "Password is required" });
  } else {
    if (!passwordInput.test(password)) {
      return res.json({
        error:
          "#Password should be between 8 to 15 characters which contain at least one lowercase letter[a-z], one uppercase letter[A-Z], one numeric digit[0-9], and one special character[!,@,#,$,%,^,&,*]",
      });
    }
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

async function googleSignInController(req, res, next) {
  const { username, image, email } = req.body;
  try {
    if (!email) {
      return res.json({ error: "Email is required" });
    } else if (!password) {
      return res.json({ error: "Password is required" });
    } else {
      const existingEmail = await UserList.find({ email });
      if (existingEmail.length > 0) {
        console.log(existingEmail[0].password);
        bcrypt
          .compare(password, existingEmail[0].password)
          .then(function (result) {
            if (result) {
              return res.json({
                success: "Login Successfull",
                id: existingEmail[0]._id,
                role: existingEmail[0].role,
                email: existingEmail[0].email,
                image: existingEmail[0].image,
                username: existingEmail[0].username,
              });
            } else {
              const users = new UserList({
                username,
                email,
                image,
                role,
              });
              users.save();
              // var token = jwt.sign({ email }, "xeeshan");

              // res.send(users);
              res.send({
                success: "Registration Successfully done.",
              });
            }
          });
      } else {
        res.json({ error: "Email is not found" });
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  registrationController,
  allUserController,
  beAdminController,
  beStudentController,
  beInstructorController,
  googleSignInController,
};
