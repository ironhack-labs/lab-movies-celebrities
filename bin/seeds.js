const mongoose = require('mongoose')
const Celebrity = require('../models/Celebrity.model') // nos importamos el modelo
const CELEBRITY = require('../data/celebrities.json')

require('../config/db.config')

mongoose.connection.once('open', ()=>{
    mongoose.connection.db.dropDatabase()   //nos borramos la database
        .then(()=>{
            console.log('Database has been eliminated')
            return Celebrity.create(CELEBRITY)
        })
        .then(createdCelebrities =>{
                createdCelebrities.forEach(celebrity => {
                console.log(`${celebrity.name} has been created`)
            })

            return mongoose.connection.close()

        })
        .then(()=>{
            console.log("Connection Closed")
            process.exit(1)  //cierra el proceso de forma exitosa
        })
        .catch((err)=>{
            console.error(err)
            process.exit(0)
        }) 
})