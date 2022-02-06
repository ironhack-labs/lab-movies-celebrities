const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';

mongoose
        .connect(MONGO_URI)
        .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
        .catch((err) => console.error("Error connecting to mongo: ", err))

const celebrities = [
    { name: "Tom Cruise", occupation: 'Actor', catchPhrase: 'This is mission imposible' },
    { name: "Chris Evans", occupation: 'Actor', catchPhrase: 'Whatever it takes' },
    { name: "Travis Scott", occupation: 'Singer', catchPhrase: 'Gosembumps' },
    { name: "Christian Bale", occupation: 'Actor', catchPhrase: "I'm Batman" },
    { name: "Jim Parsons", occupation: 'Comedian', catchPhrase: 'Bazinga' },
    { name: "Elon Musk", occupation: 'To the Moooon', catchPhrase: 'Entrepeneur' }
];

Celebrity.create(celebrities)
         .then(celebrityDB => {
            console.log(`Created ${celebrityDB.length} celebrities`)
            mongoose.connection.close()
         })
         .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`))