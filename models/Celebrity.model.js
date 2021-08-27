// require schema and model from mongoose
const { Schema, model } = require("mongoose");

// define the schema for the model
const celebritySchema = new Schema({
  name: {
    type: String,
    max: 50,
  },
  occupation: {
    type: String,
    enum: ["Actor", "Singer", "Comedian", "Unknown"],
  },
  catchPhrase: String,
});

// export the model
const CelebrityModel = model("CelebrityModel", celebritySchema);

module.exports = CelebrityModel;
