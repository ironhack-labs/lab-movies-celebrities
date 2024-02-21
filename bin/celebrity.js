const mongoose = require('mongoose');

const Celebrity = require('../models/Celebrity.model');

// ℹ️ Connects to the database
require("../db");

//Celebrity.collection.drop();

const celebrities = [
    {
        name: 'Tom Cruise',
        occupation: 'actor',
        catchPhrase: 'top gun'
    },
    {
        name: 'Beyonce',
        occupation: 'singer',
        catchPhrase: 'queen'
    }
];

Celebrity.create(celebrities)
    .then(dbUsers => {
        console.log(`Created ${dbUsers.lenght} celebrities`);
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating celebrities in the DB: ${err}`))