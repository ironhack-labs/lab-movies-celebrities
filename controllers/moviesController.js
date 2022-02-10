
const mongoose		= require("mongoose")
const Movie		= require("./../models/Movie.model")


// create celebrities (render)
exports.createMovies = (req, res) =>{
    res.render('movies/new-movie')
}


// post form celebrities (form)
exports.createMoviesForm =async (req, res) =>{
 console.log(req.body)
    const {title, genre, plot, cast} = req.body
    try {
			await Movie.create({title, genre, plot, cast })
		    return res.redirect("/movies")	
    	} catch (error) {
		return res.render("movies/new-movie",{ errorMessage:"Try again"})
	}
}


// get movies
exports.getMovies = async (req, res) => {

    try {
		const foundMovie = await Movie.find({})
		res.render("movies/movies", {
			data: foundMovie
		})
	} catch (error) {	
		console.log(error)
	}
}	


// get only one movie
exports.getSingleMovie = async (req, res) => {

	// 1. SABER CUÁL MOVIE QUIERES LEER. OBTENER EL IDENTIFICADOR DE LA MOVIE
	const { movieID } = req.params

	// 2. REALIZAR BÚSQUEDA DE LA MOVIE INDIVIDUAL A TRAVÉS DE SU ID
	const getTheMovie = await Movie.findById(movieID)

	res.render("movies/movie-details", {
		movie: getTheMovie
	})
}