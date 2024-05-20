const BASE_URL = process.env.REACT_APP_BASE_URL;

//AUTH APIS
export const authEndpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  CHANGEPASSWORD_API: BASE_URL + "/auth/changePassword",
};

//COURSE APIS
export const courseEndpoints = {
  ADDCOURSE_API: BASE_URL + "/course/addCourse",
};

//EXAM PAPER APIS
export const examPaperEndpoints = {
  UPLOAD_PAPER_API: BASE_URL + "/examPaper/uploadPaper",
  COURSE_PAPER_API: BASE_URL + "/examPaper/getCoursePaper",
  ALL_PAPER_API: BASE_URL + "/examPaper/getAllPapers",
  GET_USER_PAPER_API: BASE_URL + "/examPaper/getUserPaper",
  DELETE_PAPER_API: BASE_URL + "/examPaper/deletePaper",
};
