const { Schema, model } = require("mongoose");

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

module.exports = Celebrity;