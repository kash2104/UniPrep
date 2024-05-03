const {uploadImageToCloudinary, deleteImageFromCloudinary} = require('../utils/imageUploader');
const ExamPaper = require('../models/ExamPaper');
const Course = require('../models/Course');
require('dotenv').config();

exports.uploadPaper = async(req, res) => {
    try {
        const {courseName, courseCode, examType, year} = req.body;
        // console.log(req.body);
        // console.log(course, examType, year);

        const paper = req.files.paper;
        // console.log(paper);

        if(!courseName || !courseCode || !examType || !year || !paper){
            return res.status(404).json({
                success:false,
                message:'All fields are required to upload the paper',
            })
        }

        
        //find the course from course schema
        const lowerCaseCourseCode = courseCode.toLowerCase();
        const lowerCaseCourseName = courseName.toLowerCase();
        const lowerCaseExamType = examType.toLowerCase();

        const courseDetails = await Course.findOne({courseCode: lowerCaseCourseCode});
        
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:'Please add the course before uploading the paper'
            })
        }
        
        //check if the paper with same credentials is already uploaded or not
        const existingPaper = await ExamPaper.findOne({
            course:courseDetails._id,
            examType:lowerCaseExamType,
            year:year,
        })
        
        if(existingPaper){
            return res.status(400).json({
                success:false,
                message:'This exam paper is already uploaded',
            })
        }
        
        //upload the paper to cloudinary
        const uploadDetails = await uploadImageToCloudinary(paper,process.env.FOLDER_NAME);
        // console.log(uploadDetails);

        //create the examPaper
        const examPaperDetails = await ExamPaper.create({
            course:courseDetails._id,
            examType:lowerCaseExamType,
            year:year,
            paperImage:uploadDetails.secure_url,
            uploadedBy:req.user.id,
        })

        //adding the paper in respective course
        const updatedCourse = await Course.findByIdAndUpdate(courseDetails._id, {
            $push:{
                coursePapers:examPaperDetails._id,
            }
        },{new:true}).populate({
            path:'coursePapers',
        });

        return res.status(200).json({
            success:true,
            message:'Paper has been uploaded successfully',
            paperdata:examPaperDetails,
            coursedata:updatedCourse,
        })
    }
    catch (error) {
        console.error('Paper upload error: ', error);
        return res.status(500).json({
            success:false,
            message:'Error occured while uploading the paper',
            error:error.message,
        })
    }
}

//get the subject wise exam paper
exports.getCoursePaper = async(req, res) => {
    try {
        let {courseCode} = req.body;

        courseCode = courseCode.toLowerCase();

        //find the course
        const courseDetails = await Course.findOne({courseCode:courseCode}).populate({
            path:'coursePapers'
        }).exec();

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could not find the papers for the course ${courseCode}.`
            })
        }

        return res.status(200).json({
            success:true,
            message:'Papers found successfully',
            data:courseDetails,
        })
    }
    catch (error) {
        console.error('course wise papers error: ', error);
        return res.status(500).json({
            success:false,
            message:'Error while getting the course papers',
            error:error.message
        })
    }
}

//get all the available papers
exports.getAllPapers = async(req, res) => {
    try {
        const allPapers = await ExamPaper.find({}).populate({
            path:'course',
            select:'courseName courseCode paperImage',
        }).exec();

        return res.status(200).json({
            success:true,
            message:'All papers found successfully',
            data:allPapers,
        })
    }
    catch (error) {
        console.error('allPapers error: ', error);
        return res.status(500).json({
            success:false,
            message:'Error while getting all the papers',
            error:error.message,
        })
    }
}

//delete a paper
exports.deletePaper = async(req, res) => {
    try {
        const {paperId, courseId, publicId} = req.body;
    
        //remove the paper from course array
        await Course.findByIdAndUpdate(courseId, {
            $pull:{
                coursePapers: paperId,
            }
        })
    
        //remove the paper from database
        await ExamPaper.findByIdAndDelete(paperId);

        const paperDelete = await deleteImageFromCloudinary(publicId);
        if(!paperDelete){
            return res.status(400).json({
                success:false,
                message:'Erro while deleting the paper from cloudinary',
            })
        }
    
        return res.status(200).json({
            success:true,
            message:'Paper has been deleted successfully',
        })  
    }
    catch (error) {
        console.error('deletePaper error: ', error);
        return res.status(500).json({
            success:false,
            message:'Error while deleting the paper',
            error:error.message,
        })
    }
}