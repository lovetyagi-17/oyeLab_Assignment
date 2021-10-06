const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,

    },
    email: {
      type: String,
      required: true,
      trim: true,

    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
   otp:{
     type: String,
     default: null
   },
   otpSendingTime: {
     type: String,
     default: null
   },
   verificationTime: {
    type: String,
    default: null
  },
   isVerified: {
    type: Boolean,
    default: false
   }



  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
