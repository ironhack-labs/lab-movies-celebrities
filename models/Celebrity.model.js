
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelSchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
    
  },
  {
    timestamps: true,
  }
);

const Model = mongoose.model("Model", modelSchema);



module.exports = Model;