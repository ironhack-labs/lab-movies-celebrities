
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
