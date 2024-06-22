//  Add your code here

const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchphrase: String

  }
)
const celebrityModel = model('celebrity', celebritySchema)
module.exports = celebrityModel
