const mongoose = require("mongoose");
require("dotenv").config();
function dbConnection() {
  mongoose.connect(process.env.MONGO_URL).then(() => console.log("Connected!"));
}

module.exports = dbConnection;
