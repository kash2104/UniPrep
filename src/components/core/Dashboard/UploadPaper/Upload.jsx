import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  viewData = null,
}) => {
  const [previewSource, setPreviewSource] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [fileType, setFileType] = useState("");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
      setFileType(file.type);
    }
  };
  //creating the drap n drop zone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    onDrop,
  });

  //for previewing the paper
  const previewFile = (file) => {
    //accessing the contents of thhe file that is uploaded
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  //for manipulating the dom elements
  const inputRef = useRef(null);

  //when we register something new
  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  //when any new file is selected
  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label}
        {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {fileType === "application/pdf" ? (
              <iframe
                src={previewSource}
                title="PDF Preview"
                alt="No Preview Available"
                className="h-full w-full rounded-md object-cover text-white"
              />
            ) : (
              <img
                src={previewSource}
                alt="No Preview Available"
                className="h-full w-full rounded-md object-cover text-white"
              />
            )}

            {!viewData && (
              <button
                className="mt-3 text-richblack-400 underline"
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex w-full flex-col items-center p-6"
            {...getRootProps()}
          >
            <input {...getInputProps()} ref={inputRef} />

            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200">
              Drag and drop a paper or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
};

export default Upload;
