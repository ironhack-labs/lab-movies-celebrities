// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model.js")
const Movie = require ("../models/Movie.model.js")

// all your routes here

router.get('/movies/', (req, res, next) => {
	Movie.find()
		.then((moviesArray) => {
			res.render('movies/movies', { moviesArray });
		})
		.catch((err) => console.log('Error while listing the movies: ', err));
});

router.get('/movies/create', (req, res, next) => {
	Celebrity.find()
		.then((celebrities) => {
			res.render('movies/new-movie', { celebrities });
		})
		.catch((err) => console.log('Error while creating the movie: ', err));
});

router.post("/movies/create", (req, res, next) => {
	const {title, genre, plot, cast} = req.body; 
	//console.log(req.body);
	Movie.create({title, genre, plot, cast})
		.then ((createdMovie) => {
			res.redirect ("/movies")
		})
		.catch(error => {
			console.log('Error while creating the movie: ', error);
			res.redirect ("movies/new-movie");
		})
});

router.get('/movies/:id', (req, res, next) => {
	const movieToDetail = req.params.id;
	Movie.findById (movieToDetail)
	//https://mongoosejs.com/docs/populate.html
		.populate ("cast")
		.then (movie => {
			res.render ("movies/movie-details", movie)
		})
	
		.catch((err) => console.log('Error while showing the movie details: ', err));
});

router.post('/movies/:id/delete', (req, res, next) => {
	const movieToDelete = req.params.id;

	Movie.findByIdAndDelete(movieToDelete)
		.then( (whatever) => {
			res.redirect('/movies')
		})
		.catch((error) => console.log('Error while deleting the movie: ', error));

})


module.exports = router;