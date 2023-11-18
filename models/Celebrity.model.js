const { Schema, model } = require('mongoose');

const celebritiesSchema = new Schema(
  {
    name: { type: String, required: false, unique: true, trim: true },
    occupation: { type: String, required: false },
    catchPhrase: { type: String, required: false },
  },
  { timestamps: true }
);

const Celebrity = model('Celebrity', celebritiesSchema);

module.exports = Celebrity;
