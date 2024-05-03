const express = require('express');
const router = express.Router();

const {uploadPaper,getCoursePaper,getAllPapers, deletePaper} = require('../controllers/ExamPaper');
const { auth } = require('../middlewares/auth');

router.post('/uploadPaper', auth, uploadPaper);
router.post('/getCoursePaper', auth, getCoursePaper);
router.get('/getAllPapers', auth, getAllPapers);
router.post('/deletePaper', auth, deletePaper);

module.exports = router;