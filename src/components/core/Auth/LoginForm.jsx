import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../services/operations/authAPI";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const submitLoginForm = async (data) => {
    console.log("Login Data: ", data);
    try {
      dispatch(login(data.email, data.password, navigate));
    } catch (error) {
      console.log("Error while logging in....", error.message);
    }
  };
  return (
    <form
      className="flex flex-col gap-7 border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14"
      onSubmit={handleSubmit(submitLoginForm)}
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
        <div className="flex flex-col gap-2  relative">
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
          <Link to="/forgot-password">
            <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
              Forgot Password
            </p>
          </Link>
          {errors.password && (
            <span className="-mt-1 text-[12px] text-yellow-300">
              Please enter your password
            </span>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[16px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]`}
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
