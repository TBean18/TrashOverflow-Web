//Import NPM Packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Import Self-Defined Files
const user = require("./routes/api/users");
const group = require("./routes/api/groups");

// MERN B notes / heroku deployment
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();

const url = process.env.MONGO_URI;

//Bodyparser
app.use(express.json());

// cors
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/public"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "public", "index.html"));
  });
}

//Connecting to DataBase
mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

// USE API ROUTES
app.use("/api/user", user);
app.use("/api/groups", group);

app.listen(port, () => console.log(`Server Started on Port ${port}`));

// //Testing out the Mailing System
// const mailer = require("./util/mailer");
// const nodemailer = require("nodemailer");
// mailer.sendVerficationEmail("utb68205@zwoho.com", "", (err, info) => {
//   if (err) console.log(err);
//   console.log(nodemailer.getTestMessageUrl(info));
// });
