import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Upload from "./Upload";
import IconBtn from "../../../common/IconBtn";
import { useSelector } from "react-redux";
import { uploadPaper } from "../../../../services/operations/examPaperAPI";
import { useNavigate } from "react-router-dom";

const examTypeArray = [
  {
    id: "mid sem",
    name: "Mid Sem",
  },
  {
    id: "end sem",
    name: "End Sem",
  },
];

const UploadPaper = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("submit data: ", data);
    setLoading(true);

    const result = await uploadPaper(
      {
        courseName: data.courseName,
        courseCode: data.courseCode,
        examType: data.examType,
        year: data.examYear,
        paper: data.examPaper,
      },
      token
    );
    setLoading(false);
    console.log("Upload paper result: ", result);
    if (result?.success) {
      navigate("/getAllPapers");
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8"
    >
      {/* courseName */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseName" className="text-sm text-richblack-5">
          Course Name
          <sup className="text-pink-200">*</sup>
        </label>

        <input
          id="courseName"
          type="text"
          placeholder="Course Name"
          {...register("courseName", { required: true })}
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />

        {errors.courseName && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Name is required
          </span>
        )}
      </div>

      {/* course Code */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="courseCode" className="text-sm text-richblack-5">
          Course Code
          <sup className="text-pink-200">*</sup>
        </label>

        <input
          id="courseCode"
          type="text"
          placeholder="Course Code"
          {...register("courseCode", { required: true })}
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />

        {errors.courseCode && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Course Code is required
          </span>
        )}
      </div>

      {/* exam type */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="examType" className="text-sm text-richblack-5">
          Exam Type
          <sup className="text-pink-200">*</sup>
        </label>

        <select
          id="examType"
          defaultValue=""
          {...register("examType", { required: true })}
          style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        >
          <option value="" disabled>
            Choose Exam Type
          </option>

          {!loading &&
            examTypeArray?.map((type, index) => {
              return (
                <option key={index} value={type?.id}>
                  {type.name}
                </option>
              );
            })}
        </select>

        {errors.examType && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Exam Type is required
          </span>
        )}
      </div>

      {/* year */}
      <div className="flex flex-col space-y-2">
        <label htmlFor="examYear" className="text-sm text-richblack-5">
          Exam year
          <sup className="text-pink-200">*</sup>
        </label>

        <input
          id="examYear"
          type="text"
          placeholder="eg. 2022, 2023, 2024"
          {...register("examYear", { required: true })}
          style={{ boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)" }}
          className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />

        {errors.examYear && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Exam Year is required
          </span>
        )}
      </div>

      {/* paper drag and drop zone */}
      <Upload
        name="examPaper"
        label="Exam Paper"
        register={register}
        setValue={setValue}
        errors={errors}
      />

      <div className="flex justify-end gap-x-2">
        <IconBtn text="Upload Paper" />
      </div>
    </form>
  );
};

export default UploadPaper;
