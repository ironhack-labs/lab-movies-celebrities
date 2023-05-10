//  Add your code here

const {Schema, model} = require('mongoose');

const celebritySchema = new Schema(
    //Info
    {
        name: String,
        occupation: String,
        catchPhrase: String
    },
      //MongoDB Options
      {
        timestamps: true
      }
);

module.exports = model('Celebrity', celebritySchema);