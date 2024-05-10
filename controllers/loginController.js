const bcrypt = require("bcrypt");
const UserList = require("../models/userSchema");

async function loginController(req, res) {
  const { email, password } = req.body;

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
            return res.json({ error: "password is not match " });
          }
        });
    } else {
      res.json({ error: "Email is not found" });
    }
  }
}
module.exports = loginController;
