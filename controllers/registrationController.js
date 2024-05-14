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
  const { username, image, email, password, role } = req.body;
  try {
    // Check if the email already exists in the database
    const existingUser = await UserList.findOne({ email });

    if (existingUser) {
      // If user exists, compare passwords
      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        // If passwords match, return success response
        return res.json({
          success: "Login Successful",
          id: existingUser._id,
          role: existingUser.role,
          email: existingUser.email,
          image: existingUser.image,
          username: existingUser.username,
        });
      } else {
        // If passwords do not match, return error response
        return res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      // If user does not exist, hash the password and create a new user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserList({
        username,
        email,
        image,
        password: hashedPassword,
        role,
      });

      // Save the new user to the database
      await newUser.save();

      // Retrieve the newly created user from the database
      const savedUser = await UserList.findOne({ email });

      // Return success response
      return res.json({
        success: "Registration Successful",
        id: savedUser._id,
        email: savedUser.email,
        image: savedUser.image,
        role: savedUser.role,
        username: savedUser.username,
      });
    }
  } catch (error) {
    // Handle errors
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
