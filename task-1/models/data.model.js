const { model, Schema } = require("mongoose");

const dataSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,

    },
    name: {
      type: String,
      required: true,
      trim: true,

    }
  },
  { timestamps: true }
);

module.exports = model("Data", dataSchema);
