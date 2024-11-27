//  Add your code here
const { mongoose, Schema, model } = require('mongoose');

const celebritySchema = new Schema(
  {
    celebName: String,
    occupation: String,
    catchPhrase: String,
},
{
  timestamps: true
});
module.exports = model('Celebrity', celebritySchema);