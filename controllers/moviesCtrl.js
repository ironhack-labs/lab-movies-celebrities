const Movie = require('../models/Movie.model')
//C: crear pelicula
exports.newMovie = async (req, res) => {
    res.render('movies/new-movie')
}
exports.newMovieForm = async (req, res) => {
    const { title, genre, plot, cast } = req.body;
    try {
        const mv = await Movie.create({ title, genre, plot, cast })
        console.log(mv);
        res.redirect('/movies')
    } catch (error) {
        console.log(error);
    } 
}
//R: Leer peliculas
exports.getMovies = async (req,res) => {
    try {
        const foundMovies = await Movie.find({});
        res.render('movies/movies', { data: foundMovies })
    } catch (error) {
        console.log(error);
    } 
}
// detalles de una pelicula
exports.viewMovie = async (req, res) => {
    const { movieID } = req.params;
    const getOneMovie = await Movie.findById(movieID);
    res.render('movies/movie-details', { movie: getOneMovie });
}

//U: editar peliculas
exports.editMovie = async (req, res) => {
    const { movieID } = req.params;
    const getOneMovie = await Movie.findById(movieID);
    res.render('movies/edit-movie', { movie: getOneMovie });
}

exports.editMovieForm = async (req, res) => {
    const { movieID } = req.params;
    const { title, genre, plot, cast } = req.body;
    try {
        await Movie.findByIdAndUpdate(movieID, { title, genre, plot, cast}, {new: true});
        return res.redirect('/movies')
    } catch (error) {
        console.log(error);
    }
}
//D: eliminar peliculas
exports.deleteMovie = async (req, res) => {
    const { movieID } = req.params;
    await Movie.findByIdAndDelete(movieID);
    res.redirect('/movies')
}