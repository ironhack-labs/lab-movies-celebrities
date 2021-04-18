const { Schema, model } = require("mongoose");

const modelSchema = new Schema(
  {
    // model properties
  },
  {
    timestamps: true
  }
);

const ModelName = model("ModelName", modelSchema);

module.exports = ModelName;
