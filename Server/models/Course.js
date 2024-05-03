const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
    },
    courseCode:{
        type:String,
        required:true,
    },
    coursePapers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ExamPaper',
    }]
})

module.exports = mongoose.model('Course', courseSchema);