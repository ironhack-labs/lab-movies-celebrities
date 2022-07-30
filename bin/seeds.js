const mongoose = require('mongoose')
const Celebrity = require('../models/Celebrity.model')
const CELEBRITIES = require('../data/celebrities.json')
const { default: mongoose } = require('mongoose')

//Nos conectamos a la base de datos

require('../config/db.config')

//La vaciamos

mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase()
    .then(() => {
        console.info('Db dropped')

        return Celebrity.create(CELEBRITIES)
    })
    .then(createdCelebrities => {
        console.log('Creating celebrities...')
        createdCelebrities.forEach(celebrity => console.log(`${celebrity.name} was created`))

        //Cerramos la conección
       return mongoose.connection.close()
    })
    .then(() => {
        console.log('Connection closed')
        process.exit(1)
    })
    .catch(err => {
        console.error(err)
        process.exit(0)
    })
})