const { Schema, model } = require("mongoose");
//  Add your code const { Schema, model } = require('mongoose')

// const Schema = mongoose.Schema
// const model = mongoose.model

const celebritySchema = new Schema({
  name: {
    type: String,
  },
  occupation: {
    type: String,
  },
  catchPhrase: {
    type: String,
  },
});

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
