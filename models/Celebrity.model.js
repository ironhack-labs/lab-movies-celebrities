const mongoose = require("mongoose");
//const { Schema, model } = mongoose;
const Schema = mongoose.Schema;

const celebritySchema = new Schema(
  {
    name: String,
    occupation : String,
    catchPhrase: String,
  },
  {
    timestamps: true
  }
);

//module.exports = model("Model", modelSchema);

const Celebrity = mongoose.model('Celebrity', celebritySchema)

module.exports = Celebrity