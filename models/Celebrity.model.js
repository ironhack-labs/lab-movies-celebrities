//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  occupation: {
      type: String,
      // enum: ["actor", "cantante", "comico", "otro"]
  },
  catchPhrase: String

}, {
  timestamps: true
})

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;

