import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePassword } from "../services/operations/authAPI";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changePasswordForm = async (data) => {
    try {
      //   console.log("changePassword data: ", data);
      dispatch(
        changePassword(
          data.email,
          data.newPassword,
          data.confirmNewPassword,
          navigate
        )
      );
    } catch (error) {
      console.log("Error while changing password....", error.message);
    }
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-center mx-auto w-11/12">
      <h1 className="text-[1.875rem] text-white leading-[2.375rem] mt-5 font-semibold">
        Reset Your Password
      </h1>
      <form
        className="flex flex-col gap-7 border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14"
        onSubmit={handleSubmit(changePasswordForm)}
      >
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
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
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
          <div className="flex flex-col gap-2  relative">
            <label htmlFor="newPassword" className="text-white">
              New Password
              <sup className="text-pink-200">*</sup>
            </label>

            <input
              name="newPassword"
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("newPassword", { required: true })}
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
            {errors.newPassword && (
              <span className="-mt-1 text-[12px] text-yellow-300">
                Please enter your password
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2  relative">
            <label htmlFor="confirmNewPassword" className="text-white">
              Confirm New Password
              <sup className="text-pink-200">*</sup>
            </label>

            <input
              name="confirmNewPassword"
              id="confirmNewPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
              {...register("confirmNewPassword", { required: true })}
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

            {errors.confirmNewPassword && (
              <span className="-mt-1 text-[12px] text-yellow-300">
                Please confirm your password
              </span>
            )}
          </div>
        </div>

        <button
          type="submit"
          className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[16px] font-bold text-richblack-700 shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]`}
        >
          Reset Password
        </button>

        <Link to="/login">
          <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
            Login here
          </p>
        </Link>
      </form>
    </div>
  );
};

export default ChangePassword;
