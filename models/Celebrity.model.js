//  Add your code here
const mongoose = require('mongoose')

const celebSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      default: 'unknown occupation',
    },
    image: {
      type: String,
      default: '../images/default-img.jpeg',
    },
    catchPhrase: {
      type: String,
      default: 'Im the best actor in the world',
    },
  },
  {
    timestamps: true,
  }
)

const Celeb = mongoose.model('Celeb', celebSchema)

module.exports = Celeb
