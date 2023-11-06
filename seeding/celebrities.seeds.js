const { mongoose } = require('mongoose')
const Celebrity = require('./../models/celebrity.model')

const celebrities = [
    { name: 'Penelope Cruz', occupation: 'actress', catchPhrase: 'Chica Almodovar' },
    { name: 'Leonardo da Vinci', occupation: 'Painter, inventor', catchPhrase: 'Simplicity is sophistication' },
    { name: 'Angelina Jolie', occupation: 'actress', catchPhrase: 'different is good' }

]

const connectionString = "mongodb://127.0.0.1:27017/lab-movies-celebrities"

mongoose
    .connect(connectionString)
    .then(x => {
        console.log(`Connected to Mongo database: "${x.connections[0].name}"`)
        return Celebrity.create(celebrities)
    })
    .then(celebritiesFromDB => {
        console.log(`Created ${celebritiesFromDB.length} books`)
        return mongoose.connection.close()
    })
    .then(() => {
        console.log('DB connection closed!')
    })
    .catch(err => {
        console.log(`An error occurred while creating celebrities from the DB: ${err}`)
    })