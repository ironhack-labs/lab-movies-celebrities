const async = require("hbs/lib/async");
const Movie = require("./../models/Movie.model")

exports.getMovies = async (req, res) => {

try {
    const foundMovies = await Movie.find({})

    res.render("movies/movies", {
        data: foundMovies
    })

} catch (error) {
    
    console.log(error)

}
};


exports.createMovie = async (req,res) => {
    return res.render("movies/new-movie")
};



exports.createMovieForm = async (req, res) => {

    const { title, genre, plot } = req.body
    
    try {
        
        const NewMovie = await Movie.create({ title, genre, plot })
        console.log(NewMovie)
        return res.redirect("/movies")
        

    } catch (error) {
        
        console.log(error)
    }
};


exports.getMovieDetails = async (req, res) => {

    const { movieID } = req.params;

    const getSingleMovie = await Movie.findById(movieID)

    res.render('movies/movie-details', { movie: getSingleMovie });

}