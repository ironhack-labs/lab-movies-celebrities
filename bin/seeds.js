const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');

const MONGO_URI =
	process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/lab-movies-celebrities';

const celebrities = [
	{
		name: 'Tom Cruise',
		occupation: 'actor',
		catchPhrase: 'Join Scientology today!',
	},
	{
		name: 'Beyonce',
		occupation: 'singer',
		catchPhrase: 'To the left, to the left',
	},
	{
		name: 'Daffy Duck',
		occupations: 'duck/actor',
		catchPhrase: "You're despicable",
	},
];

mongoose
	.connect(MONGO_URI)
	.then((x) => {
		console.log(
			`Connected to Mongo! Database name: "${x.connections[0].name}"`
		);

		return Celebrity.deleteMany({});
	})
	.then((response) => {
		console.log(response);

		return Celebrity.insertMany(celebrities);
	})
	.then((celebritiesFromDB) => {
		console.log(`Created ${celebritiesFromDB.length} stars`);

		// Once created, close the DB connection
		mongoose.connection.close();
	})
	.catch((err) => {
		console.error('Error connecting to DB: ', err);
	});
