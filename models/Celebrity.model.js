const { Schema, model } = require('mongoose')

const CelebritySchema = {
  name: String,
  occupation: {
    type: String,
    enum: ['actor/actress', 'singer', 'comedian', 'unknown'],
  },
  catchPhrase: String,
}

const Celebrity = model('Celebrity', CelebritySchema)

module.exports = Celebrity
