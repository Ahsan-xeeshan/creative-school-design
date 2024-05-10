const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: String,
  },

  role: {
    type: String,
    default: "student",
    enum: ["student", "instructor", "admin"],
  },
  token: String,
});

module.exports = mongoose.model("UserList", userSchema);
