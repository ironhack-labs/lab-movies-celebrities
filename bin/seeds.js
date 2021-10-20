const mongoose = require('mongoose');

const Celebrity = require('../models/Celebrity.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
    {
    name: 'Johny Depp',
    occupation: "actor",
    catchPhrase: "Funny freak"
    },
    {
    name: 'Britney',
    occupation: "Actress",
    catchPhrase: "Talented"
    }
]


Celebrity
.create(celebrities)
.then(celebritiesFromDB => {
    console.log(`Created ${celebritiesFromDB.length} celebrities`);
    mongoose.connection.close();
})
.catch(err => console.log(`An error occurred while adding movies to the DB: ${err}`));