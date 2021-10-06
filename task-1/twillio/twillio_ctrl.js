'use strict'
// var responseMessage = require('./../user/user.message');
const twilioService = require('./twilio_service');

const sendMessage = async (req, res) => {
    console.log("hi");
    try {
        let sendSMS = await twilioService.sendSMS('+918755083620', 'Welcome to E-Pscho Noobie #1 from Himanshu Noobie');
        console.log('code: ', verifyCode.code);
        return res.json({ status: "Success", code: 200, msg: "SuccessFully Done!", data: sendSMS });
    } catch (err) {
        console.log(err.message);
        return res.json({ status: "Failure", code: 301, msg: err.message });
    }
}

exports.sendMessage = sendMessage;
