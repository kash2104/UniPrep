const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async (req, res, next) => {
  try {
    //authenticating the user by token present inside cookies
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization").replace("Bearer ", "");

    //token not present
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Your token is missing. Please login",
      });
    }

    //verify token using jwt secret
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

      // console.log('decodedToken is: ', decodedToken);

      //adding the elements of the token i.e. user._id & user.email into req.user
      req.user = decodedToken;
    } catch (error) {
      return res.status(401).json({
        //token expires in 24hrs
        success: false,
        message: "Token is invalid",
      });
    }

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Error while validating the token",
    });
  }
};
