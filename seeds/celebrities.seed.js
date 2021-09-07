const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

require('../db/index.js')

Celebrity.create({name: "Tom Cruise", occupation: "Actor", catchPhrase: "Hello"})
    .then(() => {
        console.log("yay! all good");
        mongoose.connection.close()
    })
    .catch(() => {
        console.log("There was a problem adding the info")
    })
