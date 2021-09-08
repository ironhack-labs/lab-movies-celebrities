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
		.catch((error) => console.log('Error while listing the movies: ', error));
});

router.get('/movies/create', (req, res, next) => {
	Celebrity.find()
		.then((celebrities) => {
			res.render('movies/new-movie', { celebrities });
		})
		.catch((error) => console.log('Error while creating the movie: ', error));
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
	
		.catch((error) => console.log('Error while showing the movie details: ', error));
});

router.post('/movies/:id/delete', (req, res, next) => {
	const movieToDelete = req.params.id;

	Movie.findByIdAndDelete(movieToDelete)
		.then( (whatever) => {
			res.redirect('/movies')
		})
		.catch((error) => console.log('Error while deleting the movie: ', error));

})

router.get('/movies/:id/edit', (req, res, next) => {
	const movieToDetail = req.params.id;
	const p1 = Movie.findById (movieToDetail)
	const p2 = Celebrity.find ()
	//const actions = [p1,p2]
	Promise.all ([p1,p2])
		.then (([p1,p2]) => {
			console.log ([p1,p2])
			res.render ("movies/edit-movie.hbs", { p1,p2 })
		})
	
		.catch((error) => console.log('Error while editing the movie: ', error));
});

router.post('/movies/:id/edit', (req, res) => {
	const movieToEdit = req.params.id;
	const { title, genre, plot, cast } = req.body;
	console.log ("Hello!")
	Movie.findByIdAndUpdate(movieToEdit, { title, genre, plot, cast }, { new: true })
		.then((whatever) => res.redirect(`/movies/${movieToEdit}`))
		.catch((error) => {
			console.log('Error while editing the movie', error);
		});
});



module.exports = router;