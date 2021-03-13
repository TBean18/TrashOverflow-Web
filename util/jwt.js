const jwt = require("jsonwebtoken");
require("dotenv").config();

//Takes a json res and signs it
// Returns a STRING
exports.createToken = function ( res )
{
    try
    {
      const accessToken =  jwt.sign( res, process.env.JWT_SECRET);

      // In order to exoire with a value other than the default, use the 
       // following
      /*
      const accessToken= jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, 
         { expiresIn: '30m'} );
                       ‘24h’
                      ‘365d’
      */

      var ret = {accessToken, error: ''};
    }
    catch(e)
    {
      var ret = {error:e.message};
    }
    return ret;
}

exports.isExpired = function( token )
{
  var isError = jwt.verify( token, process.env.JWT_SECRET, 
    (err, verifiedJwt) =>
  {
    if( err )
    {
      return true;
    }
    else
    {
      return false;
    }
  });

  return isError;
}

//Creates a new token based off a previous one
exports.refresh = function( token )
{
  var ud = jwt.decode(token,{complete:true});

  return createToken(ud.payload);
}

// Verifies a supplied user_ID with the user_ID in a token
// Returns a Boolean value
exports.verifyID = function( token, user_ID) {
    var valid = jwt.verify(token, process.env.JWT_SECRET, (err, verifiedJwt) => {
        //Token expired error check
        if(err){
            throw err;
        }
        //If the user_ID matches the one in the token the user is verified
        if(verifiedJwt.user_ID == user_ID){
            return true;
        }
        return false;
    });
    return valid;
}