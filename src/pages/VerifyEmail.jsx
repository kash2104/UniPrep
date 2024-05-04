import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendotp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
  const { loading } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { signupData } = useSelector((state) => state.auth);

  //if anything missing in signup form, then go back to signup form
  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const { firstName, lastName, email, password, confirmPassword } =
      signupData;

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        otp,
        navigate
      )
    );
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div className="spinner">Loading...</div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">
            Verify Email
          </h1>

          <p className="my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>

          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span>-</span>}
              renderInput={(props) => (
                <input
                  name="otp"
                  id="otp"
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{ justifyContent: "space-between", gap: "0 6px" }}
            />

            <button
              type="submit"
              className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>

          <div className="flex items-center justify-between mt-6">
            <Link to="/signup">
              <p className="flex items-center gap-x-2 text-richblack-5">
                <BiArrowBack />
                Back to Sign Up
              </p>
            </Link>

            <button
              onClick={() => dispatch(sendotp(signupData.email, navigate))}
              className="flex items-center text-blue-100 gap-x-2"
            >
              <RxCountdownTimer />
              Resend it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
