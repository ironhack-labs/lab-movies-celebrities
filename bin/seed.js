const mongoose = require('mongoose')

const Celebrity = require('../models/Celebrity.model.js')

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-movies-celebrities";

const celebrities = [
    {
        name: 'Angry Joe',
        occupation: 'Youtuber',
        catchPhrase: 'Just Four Hours!!!!'
    },
]

async function addCelebrity() {
    try {
        let db = await mongoose.connect(MONGO_URI)

        console.log('DataBase is Connected')

        let celebritiesAdded = await Celebrity.create(celebrities)

        console.log(`Created ${celebritiesAdded.length} Celebrity`)

        await mongoose.connection.close();
    } catch (error) {
        console.log('An error occured', error)
    }
}

addCelebrity();