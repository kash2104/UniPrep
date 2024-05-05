import React from "react";
import { authEndpoints } from "../apis";
import toast from "react-hot-toast";
import { setLoading, setToken } from "../../slices/authSlice";
import { apiConnector } from "../apiconnector";

const { SENDOTP_API, SIGNUP_API, LOGIN_API, CHANGEPASSWORD_API } =
  authEndpoints;

export function sendotp(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SENDOTP_API, {
        email,
        registeredUser: true,
      });

      console.log("SENDOTP API RESPONSE......", response);
      console.log(response.data.success);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("OTP sent successfully");
      navigate("/verify-email");
    } catch (error) {
      console.log("SENDOTP API ERROR....", error);
      toast.error("Could not send OTP");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function signUp(
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  otp,
  navigate
) {
  //all the things used in the signup is in the setSignupData in authSlice
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
      });

      console.log("SIGNUP API RESPONSE...", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Signup successfull");
      navigate("/login");
    } catch (error) {
      console.log("SIGNUP API ERROR.....", error);
      toast.error("Signup failed");
      navigate("/signup");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      console.log("LOGIN API RESPONSE...", response);

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Login Successfull");
      dispatch(setToken(response.data.token));

      localStorage.setItem("token", JSON.stringify(response.data.token));

      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/getAllPapers");
    } catch (error) {
      console.log("LOGIN API ERROR............", error);
      toast.error("Login Failed");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function changePassword(
  email,
  newPassword,
  confirmNewPassword,
  navigate
) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector("POST", CHANGEPASSWORD_API, {
        email,
        newPassword,
        confirmNewPassword,
      });

      console.log("CHANGEPASSWORD_API API RESPONSE......", response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error) {
      console.log("CHANGEPASSWORD API ERROR............", error);
      toast.error("Password Reset Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}
