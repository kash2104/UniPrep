import toast from "react-hot-toast";
import { examPaperEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {
  UPLOAD_PAPER_API,
  ALL_PAPER_API,
  COURSE_PAPER_API,
  GET_USER_PAPER_API,
  DELETE_PAPER_API,
} = examPaperEndpoints;

export const uploadPaper = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", UPLOAD_PAPER_API, data, {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    });

    console.log("UPLOAD_PAPER_API API RESPONSE...", response);

    if (!response?.data?.success) {
      throw new Error("Could not upload the paper");
    }

    toast.success("Paper Uploaded successfully");

    result = response?.data;
  } catch (error) {
    console.log("Upload Paper API data: ", data);
    console.log("UPLOAD_PAPER_API ERROR...", error);
    toast.error(`${error.response.data.message}`);
  }

  toast.dismiss(toastId);

  return result;
};

export const getAllPaper = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("GET", ALL_PAPER_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("ALL_PAPER_API RESPONSE...", response);

    if (!response?.data?.success) {
      throw new Error("Could not get all the papers");
    }

    // toast.success("All papers fetched!!");

    result = response?.data?.data;
  } catch (error) {
    console.log("ALL_PAPER_API API ERROR...", error);
    toast.error(`${error.response.data.message}`);
  }
  toast.dismiss(toastId);

  return result;
};

export const coursePaper = async (data, token) => {
  let result = null;

  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("POST", COURSE_PAPER_API, data, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error("Erro while getting course wise paper");
    }

    console.log("COURSE_PAPER_API API RESPONSE...", response);

    result = response?.data?.data;
  } catch (error) {
    // console.log("Upload Paper API data: ", data);
    console.log("COURSE_PAPER_API ERROR...", error);
    toast.error(`${error.response.data.message}`);
  }

  toast.dismiss(toastId);

  return result;
};

export const fetchUserPaper = async (token) => {
  let result = [];
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("GET", GET_USER_PAPER_API, null, {
      Authorization: `Bearer ${token}`,
    });

    console.log("GET USER PAPER API RESPONSE...", response);

    if (!response?.data?.success) {
      throw new Error("Could not fetch user papers");
    }

    result = response?.data?.data;
  } catch (error) {
    console.log("GET USER PAPERS API ERROR....", error);
    toast.error(error.message);
  }

  toast.dismiss(toastId);

  return result;
};

export const deletePaper = async (data, token) => {
  const toastId = toast.loading("Loading...");

  try {
    const response = await apiConnector("DELETE", DELETE_PAPER_API, data, {
      Authorization: `Bearer ${token}`,
    });

    console.log("DELETE PAPER API RESPONSE....", response);

    if (!response?.data?.success) {
      throw new Error("Could not delete the paper");
    }

    toast.success("Paper deleted");
  } catch (error) {
    console.log("DELETE PAPER API ERROR....", error);

    toast.error(error.message);
  }

  toast.dismiss(toastId);
};
