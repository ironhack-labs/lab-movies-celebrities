//  Add your code here

const { Schema, model } = require('mongoose');

const celebSchema = new Schema(
  {
    name: {
        type: String,
        require: true
    },

    occupation: String,

    catchPhrase: String,

  })

  module.exports = model('Celebrity', celebSchema);
