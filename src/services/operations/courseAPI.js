import toast from "react-hot-toast";
import { courseEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const { ADDCOURSE_API } = courseEndpoints;

export const addCourse = async (data, token) => {
  let result;

  try {
    const response = await apiConnector("POST", ADDCOURSE_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("ADDCOURSE_API API REPSONSE...", response);

    if (!response?.data?.success) {
      toast.error("Course already exists.");
      //   throw new Error("Could not add course");
    }

    toast.success("Course added successfully");
    result = response?.data?.data;

    return result;
  } catch (error) {
    console.log("ADD COURSE API ERROR...", error);
    toast.error(error.message);
  }
};
