const mongoose = require("mongoose");
const { Schema } = mongoose;

const classSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  instructorname: {
    type: String,
    required: true,
  },
  classname: {
    type: String,
    required: true,
  },
  instructorid: {
    type: Schema.Types.ObjectId,
    ref: "UserList",
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  enrolled: {
    type: String,
  },
  classSelector: {
    type: Schema.Types.ObjectId,
    ref: "UserList",
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "accept", "reject"],
  },
  feedback: {
    type: String,
  },
  created: {
    type: Date,
    default: new Date(),
  },
  updated: {
    type: Date,
  },
});

module.exports = mongoose.model("ClassList", classSchema);
