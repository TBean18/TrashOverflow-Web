//Import NPM Packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

//Import Self-Defined Files
const user = require("./routes/api/users");
const group = require("./routes/api/groups");
const chores = require("./routes/api/chores");
const schedules = require("./routes/api/schedules");

// MERN B notes / heroku deployment
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();

const url = process.env.MONGO_URI;

//Bodyparser
app.use(express.json());

// cors
app.use(cors());

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
app.use("/api/chores", chores);
app.use("/api/schedules", schedules);

// Serve Static Assets if in production
if (process.env.NODE_ENV === "production") {
  // Set styatic Folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server Started on Port ${port}`));
