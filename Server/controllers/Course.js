const Course = require("../models/Course");

exports.addCourse = async (req, res) => {
  try {
    let { courseName, courseCode } = req.body;

    if (!courseName || !courseCode) {
      return res.status(400).json({
        success: false,
        message: "All fields are required to add the course in course list",
      });
    }

    courseName = courseName.toLowerCase();
    courseCode = courseCode.toLowerCase();

    const courseDetails = await Course.findOne({ courseName: courseName });
    if (courseDetails) {
      return res.json({
        success: false,
        message: "This course already exists",
      });
    }

    const newCourse = await Course.create({
      courseName: courseName,
      courseCode: courseCode,
      coursePapers: [],
    });

    return res.status(200).json({
      success: true,
      message: "Course added successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error("addCourse error: ", error);
    return res.status(500).json({
      success: false,
      message: "Error while adding the course",
      error: error.message,
    });
  }
};
