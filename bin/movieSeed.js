const mongoose = require('mongoose')

const Celebrity = require('../models/Celebrity.model.js')
const Movie = require('../models/Movie.model.js')

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-movies-celebrities";

const movies = [
    {
        title:'Lord of the rings',
        genre: 'Adventure',
        plot: 'An unlikely group of heroes must come together and destory the One Ring before its master reclaim it and dominate Middle-Earth',
        
    }
]





async function addMovie() {
    try {
        let db = await mongoose.connect(MONGO_URI)

        console.log('DataBase is Connected')

        let moviesAdded = await Movie.create(movies)

        console.log(`Created ${moviesAdded.length} Movie`)

        await mongoose.connection.close();
    } catch (error) {
        console.log('An error occured', error)
    }
}

addMovie();