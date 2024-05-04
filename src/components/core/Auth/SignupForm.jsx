import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import toast from "react-hot-toast";
import { setSignupData } from "../../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { sendotp } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitSignupForm = async (data) => {
    // console.log("signup data: ", data);

    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log("signupData: ", data);
    try {
      dispatch(setSignupData(data));
      dispatch(sendotp(data.email, navigate));
    } catch (error) {
      console.log("Error while signing up", error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(submitSignupForm)}
      className="flex flex-col gap-7 border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14"
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstName" className="text-white">
            First Name
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            name="firstName"
            id="firstName"
            type="text"
            placeholder="Enter your first Name"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <span className="-mt-1 text-[12px] text-yellow-300">
              Please enter your name
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastName" className="text-white">
            Last Name
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            name="lastName"
            id="lastName"
            type="text"
            placeholder="Enter your last Name"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <span className="-mt-1 text-[12px] text-yellow-300">
              Please enter your last name
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-white">
          Email Address
          <sup className="text-pink-200">*</sup>
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          {...register("email", { required: true })}
        />
        {/* error handling for email */}
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your email
          </span>
        )}
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%] relative">
          <label htmlFor="password" className="text-white">
            Password
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            name="password"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("password", { required: true })}
          />

          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[45px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span>
          {errors.password && (
            <span className="-mt-1 text-[12px] text-yellow-300">
              Please enter your password
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2 lg:w-[48%] relative">
          <label htmlFor="confirmPassword" className="text-white">
            Confirm Password
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            name="confirmPassword"
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            {...register("confirmPassword", { required: true })}
          />

          <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[45px] z-[10] cursor-pointer"
          >
            {showConfirmPassword ? (
              <AiOutlineEyeInvisible fontSize={24} />
            ) : (
              <AiOutlineEye fontSize={24} />
            )}
          </span>

          {errors.confirmPassword && (
            <span className="-mt-1 text-[12px] text-yellow-300">
              Please confirm password
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[16px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]`}
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
