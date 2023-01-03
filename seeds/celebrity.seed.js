const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/lab-mongoose-movies';

const celebrities = [
    { name: 'Arnold Schwarzenegger', occupation: 'Actor', catchPhrase: 'I\'ll be back' },
    { name: 'Sylvester Stallone', occupation: 'Actor', catchPhrase: 'I\'m getting too old' },
    { name: 'Bruce Willis', occupation: 'Actor', catchPhrase: 'Yippee ki yay' },
];

mongoose.connect(MONGO_URI).then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    Celebrity.create(celebrities)
        .then((celebrities) => {
            console.log(celebrities.length + ' celebrities added to database');
            mongoose.connection.close();
        })
        .catch((err) => {
            console.log(err);
        });
})
    .catch((err) => {
        console.error('Error connecting to database', err);
    }
    );


