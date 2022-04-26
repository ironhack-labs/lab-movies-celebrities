const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

  const  newCeleb = [
    {
      name: 'lebron james',
      occupation: 'player nba',
      catchPhrase: 'basketball man, i like it ',
   },
   {
    name: 'Ana de armas',
    occupation: 'actress',
    catchPhrase: 'sexy and you know it',
  }
  ]


  Celebrity.create(newCeleb)
    .then((celebFromDB) => {console.log("celebs created correctly: ", celebFromDB)
                           
                        })
    .catch(err => console.log("error creating celebrities: ", err))

    .finally(() => {
        mongoose.connection.close();
      });    // Once created, close the DB connection
  

    
