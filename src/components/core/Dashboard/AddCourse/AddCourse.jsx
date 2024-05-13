import React, { useState } from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../common/IconBtn";
import { GrAddCircle } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCourse } from "../../../../services/operations/courseAPI";
import toast from "react-hot-toast";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log("AddCourse Form Data...", data);
    const toastId = toast.loading("Loading...");

    setLoading(true);
    const result = await addCourse(
      { courseName: data.courseName, courseCode: data.courseCode },
      token
    );

    setLoading(false);
    toast.dismiss(toastId);
    console.log("Printing RESULT while adding course", result);

    if (result) {
      navigate("/uploadPaper");
    }
  };
  return (
    <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">Add Course</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col space-y-2">
          {/* course name */}
          <label className="text-sm text-richblack-5" htmlFor="courseName">
            Course Name
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            id="courseName"
            placeholder="Add Course Name"
            style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
            {...register("courseName", { required: true })}
          />

          {errors.courseName && (
            <span className="ml-1 text-xs tracking-wide text-pink-200">
              Course Name is required
            </span>
          )}

          {/* course code  */}
          <label className="text-sm text-richblack-5" htmlFor="courseCode">
            Course Code
            <sup className="text-pink-200">*</sup>
          </label>

          <input
            id="courseCode"
            placeholder="Add Course Code"
            style={{ boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)" }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
            {...register("courseCode", { required: true })}
          />

          {errors.courseCode && (
            <span className="ml-1 text-xs tracking-wide text-pink-200">
              Course Code is required
            </span>
          )}
        </div>

        <div className="flex items-end gap-x-4">
          <IconBtn
            type="submit"
            text="Add Course"
            outline={true}
            customClasses={"text-white mt-5"}
            disabled={loading}
          >
            <GrAddCircle className="text-yellow-50" size={20} />
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
