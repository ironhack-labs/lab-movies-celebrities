const mongoose = require('mongoose')
const Celebrity =require ("../models/Celebrity.model")
const CELEBRITIES = require ('../data/celebrities.json')

//conexión BD

require("../db/index")

mongoose.connection.once('open', () => {
    mongoose.connection.db.dropDatabase()
    .then(() => {
        console.log('db dropped')
        return Celebrity.create(CELEBRITIES)
    })
    .then (createdCelebrities => {
        console.log ('creating celebrities ...........💃💃💃')
        createdCelebrities.forEach(celebrities =>
            console.log(`${celebrities.name} was created ....... 👍💃!`))

     // cierro la conexión BD

     return mongoose.connection.close()
    })
    .then(()=>{
        console.log(`conection closed`)
        process.exit(1)
    })
    .catch (err => {
        console.error(err)
        process.exit(0)
    })
})