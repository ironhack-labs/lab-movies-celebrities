const celebrities = [
	{
		name: 'Suzanne Collins',
		age: 40,
		country: 'US',
	},
	{
		name: 'J.K. Rowling',
		age: 50,
		country: 'UK',
	},
];

const mongoose = require('mongoose');
const Movie = require('../models/Movie.model');

mongoose
	.connect('mongodb://127.0.0.1/movies-database')
	.then((x) => {
		console.log(`Connected to Mongo database: "${x.connections[0].name}"`);
		return Movie.create(celebrities);
	})
	.then((moviesFromDB) => {
		console.log(`Created ${moviesFromDB.length} movies`);
		return mongoose.connection.close();
	})
	.then(() => {
		console.log('DB connection closed!');
	})
	.catch((err) => {
		console.log(`An error occurred while creating movies from the DB: ${err}`);
	});
