const mongoose = require('mongoose')

const Movie = require('./../models/Movie.model')
const Celebrity = require('./../models/Celebrity.model')

const celebrities = [{
    "name": "Bradley Cooper",
    "occupation": "Actor",
    "catchPhrase": "No se me ocurre ninguna"
}, {
    "name": "Robert de Niro",
    "occupation": "Actor",
    "catchPhrase": "Come on"
}, {
    "name": "Leonardo Di Caprio",
    "occupation": "Actor",
    "catchPhrase": "ni idea"
}, {
    "name": "Cillian Murphy",
    "occupation": "Genio y Figura",
    "catchPhrase": "ni idea 2"
}, {
    "name": "Adam Sandler",
    "occupation": "Comediante",
    "catchPhrase": "ni idea 3"
}, {
    "name": "Chris Rock",
    "occupation": "Comediante",
    "catchPhrase": "Recibo bien las bofetadas"
}, {
    "name": "Jennifer Lawrence",
    "occupation": "Actriz",
    "catchPhrase": "ni idea 4"
}, {
    "name": "Josh Hutcherson",
    "occupation": "Actor",
    "catchPhrase": "ni idea 5"
}, {
    "name": "Juancho Hernangomez",
    "occupation": "Jugador de baloncesto",
    "catchPhrase": "ni idea 6"
}, {
    "name": "Sandra Bullock",
    "occupation": "Actriz",
    "catchPhrase": "ni idea 7"
}, {
    "name": "Rihanna",
    "occupation": "Cantante",
    "catchPhrase": "ni idea 8"
}, {
    "name": "Kim Kardashian",
    "occupation": "Unknown",
    "catchPhrase": "ni idea 0"
}]

const connectionString = 'mongodb://127.0.0.1:27017/lab-movies-celebrities'

mongoose
    .connect(connectionString)
    .then(x => {
        console.log(`Connected to Mongo database: "${x.connections[0].name}"`)
        return Celebrity.create(celebrities)
    })
    .then(celebritiesFromDB => {
        console.log(`Created ${celebritiesFromDB.length} celebrities`)
        return mongoose.connection.close()
    })
    .then(() => {
        console.log('DB connection closed!')
    })
    .catch(err => {
        console.log(`An error occurred while creating movies from the DB: ${err}`)
    })


const movies = [{
    title: "Sin límites",
    genre: "Thriller",
    plot: "Un escritor  llega a ser una de las personas más influyentes de estados unidos gracias a una nueva droga que desbloquea todo el potencial del cerebro",
    cast: [{
        _id
6548e0288ba47f02295a0d7a
name
"Bradley Cooper"
occupation
"Actor"
catchPhrase
"No se me ocurre ninguna"
    }, {
        name: "Robert de Niro",
        occupation: "Actor",
        catchPhrase: "Come on"
    }]
},
{
    title: "Origen",
    genre: "Thriller",
    plot: "Un profesional en obtener secretos de la mente de otras personas se enfrenta a su mayor reto",
    cast: [{
        name: "Leonardo Di Caprio",
        occupation: "Actor",
        catchPhrase: "ni idea"
    },]
},
{
    title: "Niños grandes",
    genre: "Comedia",
    plot: "Cuenta el verano de cuatro familias",
    cast: ["Adam Sandler", "Chris Rock"]
},
{
    title: "Los juegos del hambre",
    genre: "Thriller",
    plot: "En un país hay 10 distritos y la única manera de evitar una guerra civil es que cada distrito envie dos personas a pelear por ellos en los juegos del hambre",
    cast: ["Jennifer Lawrence", "Josh Hutcherson"]
},
{
    title: "Garra",
    genre: "Thriller",
    plot: "La última oportunidad de un cazatalentos que lleva a un jugador a su país, sin el permiso de su equipo, para intentar que entre en la NBA",
    cast: ["Adam Sandler", "Juancho Hernangomez"]
},
{
    title: "Ocean's 8",
    genre: "Acción",
    plot: "Reclutan a un equipo de especialistas para robar un collar de diamantes",
    cast: ["Sandra Bullock", "Rihanna", "Kim Kardashian"]
}]





mongoose
    .connect(connectionString)
    .then(x => {
        console.log(`Connected to Mongo database: "${x.connections[0].name}"`)
        return Movie.create(movies)
    })
    .then(moviesFromDB => {
        console.log(`Created ${moviesFromDB.length} movies`)
        return mongoose.connection.close()
    })
    .then(() => {
        console.log('DB connection closed!')
    })
    .catch(err => {
        console.log(`An error occurred while creating movies from the DB: ${err}`)
    })
