const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here
router.get("/create", (req, res)=>{
    Celebrity.find()
    .then(allCelebs=>{
        res.render("movies/new-movie", {allCelebs})
    })
    .catch(err => console.log(err))
})

router.post("/create", (req, res)=>{
    const {title, genre, plot, cast}= req.body
    Movie.create({title, genre, plot, cast})
    .then(newMovie=>{
        console.log("Movie created!!", newMovie)
        res.redirect("/movies")
    }) 
    .catch(err=> console.log(err))
})

router.get('/', (req, res) => {
	Movie.find()
		.populate('cast')
		.then((allMovies) => {
			console.log(allMovies);
			res.render('movies/movies', { allMovies });
		})
		.catch((err) => console.log(err));
});

router.get('/:id', (req, res) => {
	//const movieId = req.params.id
	const { id } = req.params;

	Movie.findById(id)
		.populate('cast')
		.then((movie) => {
			console.log(movie);
			res.render('movies/movie-details', { movie });
		})
		.catch((err) => console.log(err));
});


//renderizar los datos de la BD dentro de los campos 
//del formulario
router.get('/:id/edit', (req, res) => {
	const { id } = req.params;

	Movie.findById(id)
		.populate('cast')
		.then((movie) => {
			console.log(movie);
			res.render('movies/edit-movie', { movie });
		})
		.catch((err) => console.log(err));
});

router.post('/:id/edit', (req, res) => {
	const { id } = req.params;

	const { title, genre, plot, cast } = req.body;

	Movie.findByIdAndUpdate(id, { title, genre, plot, cast })//para hacer update necesitamos la id del objeto y los datos del formulario
		.then((updatedMovie) => {
			console.log(updatedMovie);
			res.redirect('/movies');
		})
		.catch((err) => console.log(err));
});

router.get('/:id/delete', (req, res) => {
	const { id } = req.params;

	Movie.findByIdAndDelete(id)
		.then(() => {
			res.redirect('/movies');
		})
		.catch((err) => console.log(err));
});



module.exports = router;