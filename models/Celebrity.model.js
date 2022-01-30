//jshint esversion:8
const { Schema, model } = require("mongoose");

const CelebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String
  },
  {
    timestamps: true
  }
);

const Celebrity = model("Celebrity", CelebritySchema);

module.exports = Celebrity;