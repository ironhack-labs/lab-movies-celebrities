const mongoose = require('mongoose');

const { Celebrity } = require('../models/Celebrity.model');

// ℹ️ Connects to the database
require('../db');

const celebrities = [
  {
    name: 'Tim Robbins',
    occupation: 'Actor | Producer | Director',
    catchphrase: 'Hey, how about a little less questions and a little more shut the hell up?',
  },
  {
    name: 'Carrie-Anne Moss',
    occupation: 'Actress | Producer',
    catchphrase: 'Screw you guys, I´m going home!',
  },
  {
    name: 'Christopher Walken',
    occupation: 'Actor | Producer',
    catchphrase: 'I guess we’ve learned that no matter who you are or where you come from, life is a terrible thing.',
  },
  {
    name: 'Tilda Swinton',
    occupation: 'Actress | Producer | Writer',
    catchphrase: 'I love God. He’s so deliciously evil.',
  },
  {
    name: 'Jeff Bridges',
    occupation: 'Actor | Producer',
    catchphrase: 'Giggity-giggity-goo!',
  },
  {
    name: 'Helena Bonham Carter',
    occupation: 'Actress | Director | Producer',
    catchphrase: 'Shut up, Meg.',
  },
];

Celebrity.create(celebrities)
  .then(() => {
    mongoose.connection.close();
  })
  .catch((err) => console.log(`An error occurred while creating fake users in the DB: ${err}`));
