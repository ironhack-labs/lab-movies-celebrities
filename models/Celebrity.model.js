const { Schema, model } = require("mongoose");

// Same as above //
// const mongoose = require('mongoose'); //<- mongoose is giving us the ability to work with models
// const schema = mongoose.Schema

const celebritySchema = new Schema(
  {
    name: { type: String, required: true},
    occupation: { type: String, enum: ['Actor', 'Singer', 'Comedian', 'Unkown'] },
    catchPhrase: { type: String}
  },
  {
    timestamps: true
  }
);

const Celebrity = model('Celebrity', celebritySchema); 

module.exports = Celebrity; //<- Best practice to have model with uppercase - and gotta export to use is elsewhere!