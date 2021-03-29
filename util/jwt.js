const jwt = require("jsonwebtoken");
require("dotenv").config();

//Takes a json res and signs it
// Returns a STRING
exports.createToken = function (res) {
  var ret;
  try {
    const accessToken = jwt.sign(
      { user_ID: res.user_ID },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    ret = { accessToken, error: "" };
  } catch (e) {
    ret = { error: e.message };
  }
  return ret;
};

exports.isExpired = function (token) {
  var isError = jwt.verify(
    token,
    process.env.JWT_SECRET,
    (err, verifiedJwt) => {
      if (err) {
        return true;
      } else {
        return false;
      }
    }
  );

  return isError;
};

//Creates a new token based off a previous one
exports.refresh = function (token) {
  var ud = jwt.decode(token, { complete: true });

  return createToken(ud.payload);
};

// Verifies a supplied user_ID with the user_ID in a token
// Returns a Boolean value
exports.verifyID = function (token, user_ID) {
  var valid = jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
    //Token expired error check
    if (err) {
      throw err;
    }
    //If the user_ID matches the one in the token the user is verified
    if (verifiedJwt.user_ID == user_ID) {
      return true;
    }
    return false;
  });
  return valid;
};

// Authentication function that decodes the supplied token from req.body.token or req.header('x-auth-token')
// and then ensures the supplied user_ID in the body is the same as the one in the token
// NOTE: I am considering just passing the decoded user_ID from the authentication
// Instead of having the client need to send it for every request
exports.authenticateUser = function (req, res, next) {
  const token = req.header("x-auth-token") || req.body.token;
  // No Token Case
  if (!token) {
    return res.status(401).json({ error: "JWT Token Required" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //No supplied user_ID case
    if (!req.body.user_ID) {
      //pass the decoded user_ID into the req.body
      req.body.user_ID = decoded.user_ID;
      return next();
    }

    //Incorrect user_ID case
    if (req.body.user_ID !== decoded.user_ID) {
      return res.status(401).json({
        error: "JWT is NOT registered to the user_id supplied in the request",
      });
    }
    next();
  } catch (e) {
    //Expired / Corrupted Case
    return res
      .status(400)
      .json({ error: "JWT Token is invalid. Please login again" });
  }
};

exports.createEmailVerficationToken = function (user_ID) {
  try {
    const token = jwt.sign({ user_ID }, process.env.EMAIL_SECRET, {
      expiresIn: "1d",
    });
    return token;
  } catch (err) {
    throw err;
  }
};

exports.verifyEmailToken = function (token) {
  try {
    const valid = jwt.verify(token, process.env.EMAIL_SECRET);
    return valid.user_ID;
  } catch (err) {
    throw err;
  }
};
