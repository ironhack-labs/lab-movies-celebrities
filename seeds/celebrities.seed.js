const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');
const DBNAME = 'mongodb://localhost/lab-movies-celebrities';

mongoose.connect(DBNAME);

const celebrities = [
    {
        name: "Marilyn Monroe",
        occupation: "actress",
        catchPhrase: "I'm a real beauty"
    },
    {
        name: "Elvis Presley",
        occupation: "singer",
        catchPhrase: "I'm the king of rock and roll"
    },
]

Celebrity.create(celebrities, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`have been Created ${celebrities.length} celebrities`);
    }
    mongoose.connection.close();
})