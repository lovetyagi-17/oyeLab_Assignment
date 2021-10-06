const router = require("express").Router();
const user = require("../controllers/user");
/*
On-Boarding
*/
router.post("/signup", user.signUp);
router.post("/otp-request", user.otpRequest);
router.post("/otp-verification", user.otpVerify);
router.post("/data", user.addData);

module.exports = router;
