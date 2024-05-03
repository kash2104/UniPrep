const mongoose = require('mongoose');

const paperSchema = new mongoose.Schema({
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
    },
    examType:{
        type:String,
    },
    year:{
        type:Number,
        
    },
    paperImage:{
        type:String,
        required:true,
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',   
    }
})

module.exports = mongoose.model('ExamPaper', paperSchema);