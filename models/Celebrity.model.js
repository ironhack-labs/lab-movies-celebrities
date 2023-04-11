const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: String,
  occupation: {
    type: String,
    enum: ["Actor", "Director"],
  },
  catchPhrase: String,
  image: String,
});

const celebrityModel = model("celebrity", celebritySchema);
module.exports = celebrityModel;
