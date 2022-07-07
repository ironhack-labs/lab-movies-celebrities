
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
);

//is first parameter correct? Is it just a variable and if so where does "book" go later?
module.exports = model('Celebrity', celebritySchema);
