import React from "react";
import { useSelector } from "react-redux";

import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";

const Template = ({ text, formType }) => {
  const { loading } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-5 items-center justify-center mx-auto w-11/12">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="flex flex-col gap-20 items-center justify-center">
          <h1 className="text-[1.875rem] text-white leading-[2.375rem] mt-5 font-semibold">
            {text}
          </h1>

          {formType === "signup" ? <SignupForm /> : <LoginForm />}
        </div>
      )}
    </div>
  );
};

export default Template;
