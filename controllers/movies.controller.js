
const Movie = require('../models/Movie.model');

exports.getMovies = async (req, res) => {

    try {
        const foundMovies = await Movie.find({});
        console.log(foundMovies);
        res.render('movies/list', {
            movies: foundMovies
        })
    } catch (error) {
        console.log(error);
    }

}

exports.createMovies = async (req, res) => {
    res.render('movies/new-movie')
}

exports.createMoviesForm = async (req, res) => {

    const { title, genre, plot, cast } = req.body;

    try {
        await Movie.create({ title, genre, plot, cast });
        return res.redirect('/movies');
    } catch (error) {
        console.log(error);
        return
    }
}

exports.getMovie = async (req, res) => {
    const { id } = req.params;
    const foundMovie = await Movie.findById(id);
    res.render('movies/movie-detail', {movie: foundMovie});
}

exports.editMovie = async (req, res) => {
    const { id } = req.params;
    const foundMovie = await Movie.findById(id);
    res.render('movies/edit-movie', { movie: foundMovie })
}

exports.editMovieForm = async (req, res) => {
    const { id } = req.params;
    const { title, genre, plot } = req.body;
    const updateMovie = await Movie.findByIdAndUpdate(
        id,
        { title, genre, plot },
        { new: true }
    )
    console.log(updateMovie);
    return res.redirect('/movies')
}

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.redirect('/movies')
}
