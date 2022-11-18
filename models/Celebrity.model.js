//  Add your code here
const { Schema, model } = require("mongoose");

const CelebritySchema = new Schema(
  {
    title: String,
    occupation: String,
    catchPhrase: String,
  }
  );

const Celebrity = model("celebrity", CelebritySchema);

module.exports = Celebrity;
