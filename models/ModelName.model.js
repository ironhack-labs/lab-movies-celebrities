const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const modelSchema = new Schema(
  {
    // model properties
  },
  {
    timestamps: true
  }
);

module.exports = model("Model", modelSchema);
