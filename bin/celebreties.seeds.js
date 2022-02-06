const mongoose = require('mongoose');
const Celebrities = require('../models/Celebrity.model');


const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

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

const celebrity = [
    {
        name: "Christian Bale",
        occupation: " Drama actor",
        catchphrase: "I am not going to kill you, but I do not have to save you either.",

    },

    {
        name: "Tom Hardy",
        occupation: "actor",
        catchphrase: "Take sex out of a relationship and you will find that many people have nothing to offer.",

    },

    {
        name: "Steve Carrel",
        occupation: "comedian",
        catchphrase: "Taste in comedy, just like in fashion, changes all the time."
    },

    {
        name: "Meryl Streep",
        occupation: "actress",
        catchphrase: "I no longer have patience for some things, not because I've become arrogant, but simply because I've reached a point in my life where I don't feel like wasting any more time with what I don't like or hurt.",

    },

    {
        name: "jennifer lawrence",
        occupation: "Comedian actress",
        catchphrase: "What I look for in acting is the opportunity to be someone else",

    },

];

Celebrities.create(celebrity)
    .then(celebritiesFromDB => {
        console.log(`Created ${celebritiesFromDB.length} celebrities`);
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating celebrities from the DB: ${err}`));