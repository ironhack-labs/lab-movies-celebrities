
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


// get celebrities
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
