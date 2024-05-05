const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const OTP = require("../models/OTP");

//sendOTP -> function for generating the otp while signing up
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    //check if email already registered
    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
      return res.status(401).json({
        success: false,
        message: "Email is already registered",
      });
    }

    //generate the otp for the email
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("Generated OTP: ", otp);

    //have to generate unique otp everytime
    const result = await OTP.findOne({ otp: otp });

    //till the otp is not found
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });

      result = await OTP.findOne({ otp: otp });
    }

    //otp entry in db. But before this, the function in OTP model with pre middleware will run
    const userotp = await OTP.create({
      email: email,
      otp: otp,
    });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpData: userotp,
    });
  } catch (error) {
    console.log("otp generation error", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
//signup
exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, confirmPassword, otp } =
      req.body;

    //check field empty
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required for signing up",
      });
    }

    //pw and confirmpw matching
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and Confirm Password do not match. Please try again",
      });
    }

    //check if user is already signed up
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered. Sign in to continue",
      });
    }

    //verify the otp
    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!recentOtp) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid otp entered",
      });
    }

    //hash the pw
    const hashedPassword = await bcrypt.hash(password, 10);

    //create User
    const user = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    //return success res
    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    console.log("signup error is: ", error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and Password are required for login",
      });
    }

    //check if user exists
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        success: false,
        message: "You have not signed up",
      });
    }

    //check the password
    if (await bcrypt.compare(password, existingUser.password)) {
      //make the token
      const payload = {
        email: existingUser.email,
        id: existingUser._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      //saving the token in user schema for future reference
      existingUser.token = token;
      //   console.log("user model token: ", existingUser.token);
      existingUser.password = undefined;

      //create the cookie
      const cookieOptions = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, cookieOptions).status(200).json({
        success: true,
        message: "You have logged in successfully",
        token: existingUser.token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password entered is incorrect",
      });
    }
  } catch (error) {
    console.error("login error is: ", error);
    return res.status(500).json({
      success: false,
      message: "Error while logging in",
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword, confirmNewPassword } = req.body;

    const registeredUser = await User.findOne({ email: email });
    if (!registeredUser) {
      return res.status(400).json({
        success: false,
        message: "You are not a registered user. Please sign up first!",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "Password is different in both the fields",
      });
    }

    //hashing the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    //update the password of the existing the user
    const updatedUserDetails = await User.findByIdAndUpdate(
      registeredUser._id,
      {
        password: hashedNewPassword,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Your password has been updated successfully",
      data: updatedUserDetails,
    });
  } catch (error) {
    console.log("changePassword error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error while resetting your password",
    });
  }
};
