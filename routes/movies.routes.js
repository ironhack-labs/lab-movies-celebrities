// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model.js")
const Movie = require ("../models/Movie.model.js")

// all your routes here

router.get('/movies/create', (req, res, next) => {
	Celebrity.find()
	/* 	Query.prototype.select()
		Parameters
		arg «Object|String|Array<String>»
		Returns:
		«Query» this
		Specifies which document fields to include or exclude (also known as the query "projection") */
		//.select('name')
		.then((celebrities) => {
			res.render('movies/new-movie', { celebrities });
		})
		.catch((err) => console.log('Error while creating the movie: ', err));
});


router.post("/movies/create", (req, res, next) => {
	const {title, genre, plot, cast} = req.body; 
	Movie.create({title, genre, plot, cast})
		.then ((createdMovie) => {
			res.redirect ("/movies")
		})
		.catch(error => {
			console.log('Error while creating the movie: ', error);
			res.redirect ("movies/new-movie");
		})
});

module.exports = router;