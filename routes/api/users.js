// SET UP THE ROUTES FOR ALL USER RELATED API ENDPOINTS
const express = require("express");
const router = express.Router();

// Item Model
const user = require("../../models/user");

//JSON Web Token
const jwt = require("../../util/jwt");

//Node Mailer Util folder
const mailer = require("../../util/mailer");

// ROUTE    GET api/users
// DESC     GET All Users
// ACCESS   Public

// Currently Disabled as there is no need for retreivng all users
// router.get("/", (req, res) => {
//   user
//     .find()
//     .then((items) => res.json(items))
//     .catch((err) => console.log(err));
// });

// ROUTE    POST api/users/register
// DESC     Register a user
// ACCESS   Public
// PARAMS   name, password_hash, phone_number, email
// RETURNS  user, token, error
router.post("/register", (req, res) => {
  //Create new user Payload
  const newUser = new user({
    name: req.body.name,
    password_hash: req.body.password_hash,
    phone_number: req.body.phone_number,
    email: req.body.email.toLowerCase(),
  });

  newUser
    .save()
    .then((item) => {
      //Make a new JSON Web Token
      let token = jwt.createToken({ user_ID: item._id });
      if (token.error !== "") throw token.error;
      //Send Responce
      res.json({ user: item, token: token.accessToken, error: "" });

      //Send Email Verification
      mailer.sendVerficationEmailSendGrid(
        newUser.email,
        jwt.createEmailVerficationToken(item._id),
        (err, info) => {
          if (err) console.log(err);
          return console.log(info);
        }
      );
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err });
    });
});

// ROUTE    GET api/users/login
// DESC     GET Login User Info
// ACCESS   Public
router.post("/login", (req, res) => {
  user
    .findOne({
      email: req.body.email,
      // password_hash: req.body.password_hash,
    })
    // Populates the user's groupPlaceHolders with the group infomation
    .populate({
      path: "groups",
      populate: {
        path: "group_ID",
        model: "group",
      },
    })
    .then((item) => {
      //Check if we have found a user
      if (item == null) throw "No User Found";

      //Compare the input password with the stored hash
      item.comparePassword(req.body.password_hash, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch) throw "Incorrect Password";
      });

      //Create the Web Token
      let token = jwt.createToken({ user_ID: item._id });
      if (token.error !== "") throw token.error;
      let output = {
        user: item,
        token: token.accessToken,
        error: "",
      };
      res.json(output);
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ error: err });
    });
});

// ROUTE    POST api/users/edit
// DESC     Change Login User Info
// ACCESS   Public
router.post("/edit", (req, res) => {
  user
    .findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        password_hash: req.body.password_hash,
        phone_number: req.body.phone_number,
        email: req.body.email.toLowerCase(),
      },
      {
        new: true,
      }
    )
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// ROUTE    DELETE api/users/
// DESC     Deletes the users account
// ACCESS   Public
router.delete("/:id/:token", (req, res) => {
  var email;
  user
    .findById(req.params.id)
    .then((item) => {
      email = { email: item.email, delete_success: true };
      item.remove().then(() => res.json(email));
    })
    .catch((err) => res.status(404).json({ error: "ID Not Found" }));
});

router.get("/verify/:token", (req, res) => {
  try {
    const user_ID = jwt.verifyEmailToken(req.params.token);
    user.findById(user_ID).then((item) => {
      item.email_verified = true;
      item.save().then((item) => {
        console.log(
          `${item.name} has verfied their Email Address (User_ID:${item._id})`
        );
        return res.redirect("http://localhost:3000/signin");
      });
    });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

router.post("/forgot_password", (req, res) => {
  const email = req.body.email;
  user
    .findOne({ email: email })
    .then((user) => {
      // No User Found Case
      if (!user)
        return res.json({ error: "No Account Found with given Email" });

      //Send Email
      mailer.sendVerficationEmailSendGrid(
        user.email,
        jwt.createEmailVerficationToken(user._id),
        (err, info) => {
          if (err) console.log(err);
          return console.log(info);
        }
      );
    })
    .catch((err) => {
      res.status(404).json({ error: err });
    });
});

router.get("/forgot_password/:token", (req, res) => {
  try {
    const user_ID = jwt.verifyEmailToken(req.params.token);
    user.findById(user_ID).then((item) => {
      item.password_hash = req.body.password;
      item.save().then((item) => {
        console.log(
          `${item.name} has changed their password (User_ID:${item._id})`
        );
        return res.redirect("http://localhost:3000/signin");
      });
    });
  } catch (err) {
    console.log(err);
    res.status(404).send(err);
  }
});

module.exports = router;
