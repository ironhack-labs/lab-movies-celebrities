const { Schema, model } = require('mongoose')

const CelebritySchema = {
  name: String,
  occupation: {
    type: String,
    enum: ['Actor/Actress', 'Singer', 'Comedian', 'unknown'],
  },
  catchPhrase: String,
}

const Celebrity = model('Celebrity', CelebritySchema)

module.exports = Celebrity
