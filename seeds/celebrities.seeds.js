const Celebrity = require('../models/Celebrity.model')
const mongoose = require("mongoose");


const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

mongoose
    .connect(MONGO_URI)
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });

const celebrities = [
    { name: 'Bryan Adams', occupation: 'singer', catchPhrase: 'you live once' },
    { name: 'Sarah Polley', occupation: 'actrice', catchPhrase: 'my life without me' },
    { name: 'Camera Obscura', occupation: 'singer', catchPhrase: 'I wish I knew' }
]

Celebrity
    .create(celebrities)
    .then(eachCelebrity => {
        console.log(`Created ${eachCelebrity.length} celebrities`)
        mongoose.connection.close()
    })
    .catch(err => console.log(err)) 
