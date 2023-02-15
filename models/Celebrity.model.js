//Iteration #2: The Celebrity model
const { Schema, model } = require('mongoose')

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    occupation: {
      type: String,
      default: 'unknown',
    },
    catchPhrase: {
      type: String,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Celebrity = model('Celebrity', celebritySchema)

module.exports = Celebrity
