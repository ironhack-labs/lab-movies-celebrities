const Celebrity = require('../models/Celebrity.model')
const mongoose = require('mongoose')

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities'

mongoose
  .connect(MONGO_URI)
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo: ', err)
  })

const celebrities = [
  { name: 'Tom Cruise', occupation: 'actor', catchPhrase: 'Show me the money.' },
  { name: 'Iñaki "Uoho" Antón', occupation: 'musician', catchPhrase: 'Music as a life style.' },
  {
    name: 'Corey Taylor',
    occupation: 'singer',
    catchPhrase: 'The people I respect the least are the ones that take themselves way too seriously.'
  },
  { name: 'Bad Bunny', occupation: 'singer', catchPhrase: 'Show me the money.' }
]

Celebrity.create(celebrities)
  .then(eachCeleb => {
    console.log(`Created ${eachCeleb.length} celebrities`)
    mongoose.connection.close()
  })
  .catch(err => console.log(err))