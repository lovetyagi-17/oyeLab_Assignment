'use strict'
const CONFIG = {
  TWILIO: {
    ACCOUNT_SID: "ACc20c2f98c4c6f1e9388d33f886fb6379",
    AUTH_TOKEN: "107d8291fbdcd6458ccbd73d11c5f367",
    SERVICE_ID: "VA97d8268b89118245f8fd9df65c6f473a	",
    PHONE_NUMBER: "+918171630747",
  },
}

module.exports.sendSMS = (number, message) => new Promise((resolve, reject) => {
    try {
        console.log("number ===> ",number);
        var client = require('twilio')(
            CONFIG.TWILIO.ACCOUNT_SID,
            CONFIG.TWILIO.AUTH_TOKEN
        );
        client.messages.create({
            from: CONFIG.TWILIO.PHONE_NUMBER,
            to: number,
            body: message
        }).then(message => {
            console.log("My Message:",message);
            resolve(message.sid)
        })
            .catch(err => {
                console.log("error while sending SMS----", err);
                reject(err);
            })
    } catch (err) {
        reject(false);
    }

})


const sendOtp = (phone) => new Promise((resolve, reject) => {
  try {
      client.verify.services(CONFIG.TWILIO.SERVICE_ID).verifications.create({
          to: phone,
          channel: 'sms'
      }).then(verification  => {
          console.log("My Message:",verification);
          resolve(verification.sid)
      })
          .catch(err => {
              console.log("error while sending SMS----", err);
              reject(err);
          })
  } catch (err) {
      reject(false);
  }

})

exports.sendOtp = sendOtp;
// exports.sendSMS = sendSMS;







