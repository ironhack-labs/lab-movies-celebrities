const mongoose = require('mongoose')
const Celebrities = require('../models/Celebrity.model');
const Movies = require('../models/Movie.model')

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
    { name: "Johnny Depp", occupation: "Actor", catchPhrase: "This is the day you will always remember as the day you almost caught Captain Jack Sparrow." },
    { name: "Leonardo DiCaprio", occupation: "Actor", catchPhrase: "I am the king of the world" },
    { name: "Emma Watson", occupation: "actress", catchPhrase: "Is leviosa, no leviosá" },
    { name: "Úrsula Corberó", occupation: "actress", catchPhrase: "When we started we had no idea what we were called, but we knew what our dreams were" },
    { name: "Mahatma Gandhi", occupation: "Politic", catchPhrase: "Live as if you were going to die tomorrow; learn as if the world were going to last forever" },
    { name: "Aristóteles", occupation: "Philosopher", catchPhrase: "The wise man never says everything he thinks, but always thinks everything he says" },
    { name: "Séneca", occupation: "Philosopher", catchPhrase: "It takes a lifetime to learn how to live" },
    { name: "Ylenia Padilla", occupation: " unknown", catchPhrase: "tiki tiki miau miau" }
];

const movie = [
    { title: "Locura en Iron", genre: "Terror", plot: "Web" },
    { title: "Joker", genre: "Crime/Drama", plot: "Society" },
    { title: "Dune", genre: "Science Fiction/Adventure", plot: "Interstellar war" },
    { title: "Parasites", genre: "Suspense/Drama", plot: "Locura de olla" },
    { title: "Split", genre: "Terror/Suspense", plot: "psychological" },
    { title: "Jojo Rabbit", genre: "War/Comedy", plot: "World War II" },
    { title: "V for Vendetta", genre: "Action/Suspense", plot: "Fighting the state" },
    { title: "The Hobbit", genre: "Fantasy/Adventure", plot: "Dwarfs saving the world" }
]

Celebrities.create(celebrity)
    .then(celebritiesFromDB => {
        console.log(`Created ${celebritiesFromDB.length} celebrities`);

    })
    .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));

//Movies llama al modelo(la constante de arriba del todo)
Movies.create(movie)// esta movie llama al array de los obj de peliculas
    .then(moviesFromDB => {
        console.log(`Created ${moviesFromDB.length} movies`);
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating books from the DB: ${err}`));