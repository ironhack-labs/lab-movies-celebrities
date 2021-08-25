const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

require('../db/index');

const celebrities = [
  {
    name: 'Rebert Deniro',
    occupation: 'Actor',
    catchPhrase:
      'You learned the two greatest thing in life, never rat on your friends, and always keep your mouth shut.',
  },
  {
    name: 'Arnold Schwarzenegger',
    occupation: 'Former Governor',
    catchPhrase: "I'll be back",
  },
  {
    name: 'Michael Jackson',
    occupation: 'Singer',
    catchPhrase:
      'Let us dream of tomorrow where we can truly love from the soul, and know love as the ultimate truth at the heart of all creation.',
  },
];
Celebrity.create(celebrities)
  .then((responseFromDB) => {
    console.log(
      `Celebrities were successfully published in the DB: ${responseFromDB}`
    );
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(
      `During creating a collection of celebtities the error appeared: ${err}`
    );
  });
