const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/templates/emailVerificationTemplate');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },

    otp:{
        type:String,
        required:true,
    },

    createdAt:{
        type:Date,
        default:Date.now,
        //otp expires in 5 minutes
        expires: 60*5,
    }
})

// function to send the mail
async function sendVerificationMail(email, otp){
    try {
        //using the transporter made in mailSender(utils) for sending the mail
        const mailResponse = await mailSender(email, 'Verification Email', emailTemplate(otp));

        console.log('Email sent successfull: ', mailResponse);
    }
    catch (error) {
        console.log('Error while sending the verification email', error);
        throw error;
    }
}
//before creating entry in db, send the mail for email verification
OTPSchema.pre('save',async function(next){
    console.log('New document saved to db');

    //send the email only when new document is create
    if(this.isNew){
        await sendVerificationMail(this.email, this.otp)
    }

    next();
})

module.exports = mongoose.model('OTP', OTPSchema);