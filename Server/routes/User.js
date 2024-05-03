const express = require('express');
const router = express.Router();

const {signup, login, changePassword, sendOTP} = require('../controllers/Auth');
const { auth } = require('../middlewares/auth');
router.post('/signup', signup);
router.post('/login', login);
router.post('/changePassword', auth, changePassword);
router.post('/sendotp', sendOTP);

module.exports = router;