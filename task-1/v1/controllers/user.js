"use strict";

const MODELS = require("../../models/index");
const { response } = require("express");
const TWILLIO = require("../../twillio/twillio_service")
var mailer = require('../mailer/mailer');


module.exports = {
  otpRequest: otpRequest,
  signUp: signUp,
  otpVerify: otpVerify,
  addData: addData
};

/* Task-3 function start */
function addData(req, res, next) {
  async function addData() {
    try {
      let user = await MODELS.data   // to check user is existing or not
      .findOne({ email: req.body.email })
      .select("email")
      .lean()
      .exec();
    if(!user) {   // if user is not present
      user = await new MODELS.data(req.body).save();
      return await res.status(200).send({
        status: 200,
        message: "Added Successfully!",
        data: user
      })
    }
    // if user alraedy present
    let email = req.body.email.split('@')[0]; // To get username
    let length = email.length;               // to count length of email
    user.name = email.substr(0, length - 2);
    await MODELS.data.findOneAndUpdate(         // Update method
      { email: req.body.email }, { name: user.name }
    ).lean().exec();
    return await res.status(200).send({
      status: 200,
      message: "Email ALraedy Exist, User name Updated Successfully!",
    });
    } catch (err) {
      next(err);
    }
  }
  addData().then(function () { });
}
/*Task -3 function finish */


/* Task-1 Code Start */
function signUp(req, res, next) {
  async function signUp() {
    try {
      let user = await MODELS.user           // to check user is already existing or not
        .findOne({ email: req.body.email })
        .select("email")
        .lean()
        .exec();
      if (user) {
        return await res.status(400).send({
          status: 400,
          message: "User Already Exists!",
          data: null
        });
      }
      user = await new MODELS.user(req.body).save();  // to save data
      let phone = '+91' + user.phone;
      // let sendMsg = await TWILLIO.sendOtp(phone);
      console.log(`User registered Successfully!`);
      return await res.status(200).send({
        status: 200,
        message: "Registred Successfully!",
        data: user
      })
    } catch (err) {
      next(err);
    }
  }
  signUp().then(function () { });
}

function otpRequest(req, res, next) {
  async function otpRequest() {
    try {
      let user = {};
      if (req.body.phone) {
        user = await MODELS.user
          .findOne({ phone: req.body.phone })
          .lean()
          .exec();
      } else {
        return await res.status(404).send({
          status: 404,
          message: "User does't Exists!",
          data: null
        });
      }
      //otp send and update to database
      let phone = '+91' + req.body.phone;
      let otp = Math.floor(100000 + Math.random() * 900000);   // to generate otp
      // console.log("User Phone No:", phone);
      let twilioMsg = 'Your login otp is :' + otp;
      // let sendSMS = await TWILLIO.sendSMS(phone, twilioMsg);
      await mailer.sendMail('himanshurawat155@gmail.com', user.email, "Echo Otp!", twilioMsg);  // for sending mail with otp
      let now = new Date();
      now = now.toLocaleTimeString();   // to get current time
      await MODELS.user
      .findOneAndUpdate( { phone : req.body.phone }, { otp: otp, otpSendingTime: now }, {multi : true} )
      .lean()
      .exec();
      return await res.status(200).send({
        status: 200,
        message: "Otp is sent Successfully"
      });
      console.log(`OTP Sent!`);
    } catch (err) {
      next(err);
    }
  }
  otpRequest().then(function () { });
}

function otpVerify(req, res, next) {
  async function otpVerify() {
    try {
      if (req.body.otp) {
         let user = await MODELS.user
          .findOne({ otp: req.body.otp })
          .lean()
          .exec();
          console.log(user)
          if(!user) {
            return await res.status(400).send({
              status: 400,
              message: "otp is incorrect!!",
              data: null
            });
          }
            else {
              if(req.body.otp == user.otp){  // to check otp (matched or not)
                let now = new Date();
                now = now.toLocaleTimeString();
                user = await MODELS.user
                .findOneAndUpdate({ otp: req.body.otp }, { isVerified: true , verificationTime: now }, { multi: true })
                .lean()
                .exec();
                return await res.status(200).send({
                  status: 200,
                  message: "Otp Verified, LoggedIn Successfully",

                });
              }
              console.log(`User LoggedIn Successfully!`);
            }

      } else {
        return await res.status(404).send({
          status: 404,
          message: "otp is incorrect!",
          data: null
        });
      }
      //otp send
    } catch (err) {
      next(err);
    }
  }
  otpVerify().then(function () { });
}

/* Task-1 Code End */


