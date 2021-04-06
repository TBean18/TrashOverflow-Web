// SET UP THE ROUTES FOR ALL USER RELATED API ENDPOINTS
const express = require("express");
const router = express.Router();

// Item Model
const user = require("../../models/user");

// JSON Web Token
const jwt = require("../../util/jwt");

// Node Mailer Util folder
const mailer = require("../../util/mailer");

// ROUTE    GET api/user
// DESC     GET All Users
// ACCESS   Public
// This is just here to help with testing.
router.get("/", (req, res) => {
  user
    .find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

// Also for testing, will simulate a user verifying their email
router.post("/verify", (req, res) => {
  try {
    if (jwt.verifyID(req.body.token, req.body.id)) {
      user.findByIdAndUpdate(req.body.id, {
            email_verified: true,
          }, {
            new: true,
          }
        )
        .then((item) => res.json(item))
        .catch((err) => res.json(err));
    }
  } catch (err) {
    console.log(err);
    res.status(404).json(err);
  }
});

// Route          POST api/user/register
// Description    Register a user
// Access         Public
// Parameters
//    name:               String - Name of new user
//    password_hash:      String - Password for new user
//    phone_number:       String - Phone number of new user
//    email:              String - Email of new user
// Returns
//    user:               JSON - Contains above info as well as the given _id
//    token:              String - Token user will need to verify to log in
//    error:              JSON { error: "" } if there is no error, or the error thrown
router.post("/register", (req, res) => {
  if (
    req.body.name === "" ||
    req.body.password_hash === "" ||
    req.body.phone_number === "" ||
    req.body.email === ""
  ) {
    res.json({ error: "Please Fill Out All Fields" });
    return;
  }
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
      let token = jwt.createToken({
        user_ID: item._id,
      });
      if (token.error !== "") throw token.error;
      //Send Responce
      res.json({
        user: item,
        token: token.accessToken,
        error: "",
      });

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
      res.status(404).json({
        error: "Unable to Register New User",
      });
    });
});

// Route          GET api/user/login
// Description    GET Login User Info
// Access         Public
// Parameters
//      email:          String - the email the user registered with
//      password_hash:  String - the password the user entered at registration
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
        if (err || !isMatch)
          return res.status(404).json({ error: `Incorrect Password` });
        if (isMatch) {
          //Create the Web Token
          let token = jwt.createToken({
            user_ID: item._id,
          });
          if (token.error !== "") throw token.error;
          let output = {
            user: item,
            token: token.accessToken,
            error: "",
          };
          res.json(output);
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({
        error: "Unable to Login",
      });
    });
});

// Route          POST api/user/edit
// Description    Change Login User Info
// Access         Public
// Parameters
//      _id:            String - the id of the user editing their account info
//      name:           String - the "updated" name of the user
//      phone_number:   String - the "updated" phone number for the user
//      email:          String - the "updated" email the user will now use to log in.
router.post("/edit", (req, res) => {
  user
    .findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        phone_number: req.body.phone_number,
        email: req.body.email.toLowerCase(),
      },
      {
        new: true,
      }
    )
    .then((items) => res.json(items))
    .catch((err) => {
      console.log(err);
      res
        .status(404)
        .json({ error: "Could Not Edit Your Account Information" });
    });
});

// Route          DELETE api/user/
// Description    Deletes the users account
// Access         Public
// Parameters
//      id:       String - ID of user to be deleted
router.delete("/:id/:token", (req, res) => {
  var email;
  user
    .findById(req.params.id)
    .then((item) => {
      email = {
        email: item.email,
        delete_success: true,
      };
      item.remove().then(() => res.json(email));
    })
    .catch((err) =>
      res.status(404).json({
        error: "ID Not Found",
      })
    );
});

// Route          GET api/user/verify
// Description
// Access         Public
// Parameters
//    token:    String - the token of the user to be verified
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
        return res
          .status(404)
          .json({ error: "No Account Found with given Email" });

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

router.post("/forgot_password/:token", (req, res) => {
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
