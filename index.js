const express = require("express");
const dbConnection = require("./config/dbConnection");
const route = require("./routes");
const cors = require("cors");
const session = require("express-session");
const app = express();
require("dotenv").config();

// Session middleware setup
app.use(
  session({
    secret: process.env.SECRET_KEY, // Change this to your own secret key
    resave: false,
    saveUninitialized: false,
    // Additional options can be added as needed
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Use CORS middleware with options
app.use(
  cors({
    origin: "https://creative-design-school.vercel.app",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);

app.use(route);

const port = process.env.PORT;
dbConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
