require("dotenv/config")

require('./index')


const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');



Celebrity.collection.drop();


const celebrity = [
    {
        name: "Tom Cruise",
        ocupation: "Artist",
        catchPhrase: "Nothing ends nicely, that's why it ends.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Tom_Cruise_by_Gage_Skidmore_2.jpg/800px-Tom_Cruise_by_Gage_Skidmore_2.jpg"
    },
    {
        name: "Beyonce",
        ocupation: "Actor",
        catchPhrase: "If everything was perfect, you would never learn and you would never grow.",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png/800px-Beyonc%C3%A9_at_The_Lion_King_European_Premiere_2019.png"
    },
    {
        name: "Noel Gallagher",
        ocupation: "Musician",
        catchPhrase: "True perfection has to be imperfect. I know that sounds foolish, but it's true.",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Noel_Gallagher_at_Razzmatazz%2C_Barcelona%2C_Spain-5March2012_%283%29.jpg",
    },
    {
        name: "Liam Gallagher",
        ocupation: "Singer",
        catchPhrase: "I’m not thinking about anything except getting the message across. I don’t even know what the f**king message is!",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Festival_des_Vieilles_Charrues_2018_-_Liam_Gallagher_-_013.jpg/800px-Festival_des_Vieilles_Charrues_2018_-_Liam_Gallagher_-_013.jpg"

    },
    {
        name: "Alexander Marino",
        ocupation: "Full stack web developer",
        catchPhrase: "I transform dreams into reality making the impossible possible",
        image: "https://alexandermarino.com/img/profile_photo.jpg"

    },


]

Celebrity
    .create(celebrity)
    .then(theCelebrity => console.log(`Se han creado ${theCelebrity.length} celebridades`))
    .catch(error => console.log('¡Ha habido un error!:', error))