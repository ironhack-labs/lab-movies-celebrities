//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'Name is required.'],
      unique: true
    },
    occupation: {
      type: String,
      trim: true,
      enum: ['actor', 'singer', 'comedian', 'unknown'],
    },
    catchphrase: {
      type: String,
    }
  },
  {
    timestamps: true
  }
);

module.exports = model('Celebrity', celebritySchema);