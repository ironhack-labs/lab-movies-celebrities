const { Schema, model } = require('mongoose')

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    occupation: {
      type: String,
      trim: true,
    },
    catchPhrase: {
      type: String,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Celebrity', celebritySchema)