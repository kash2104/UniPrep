const express = require('express');
const router = express.Router();

const {addCourse} = require('../controllers/Course');
const { auth } = require('../middlewares/auth');

router.post('/addCourse', auth, addCourse);

module.exports = router;