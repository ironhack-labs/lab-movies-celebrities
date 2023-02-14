const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  occupation: {
    type: String,
    require: true,
    default: "unknown",
  },
  catchPhrase: {
    type: String,
  }
}, {
    timestamps: true,
});

module.exports = model("Celebrity", celebritySchema);