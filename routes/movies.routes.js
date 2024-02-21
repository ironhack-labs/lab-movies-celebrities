const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model")
//item7
router.get("/movies", (req, res, next) => {
    Movie.find()
        .then(allMovies => {
            res.render("movies/movies", { movies: allMovies })
        })
        .catch(err => {
            console.error(`Error has been occured during the listing all movies: ${err}`)
            next(err)
        })
})

//item 6
router.get("/movies/create", (req, res) => {
    Celebrity.find()
        .then(dbCelebrities => {
            res.render("movies/new-movie", { celebrities: dbCelebrities })
        })
        .catch(err => {
            console.error(`Error has been occured during the listing all celebrities: ${err}`)
            next(err)
        })
});

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;//destructor
    Movie.create({ title: title, genre: genre, plot: plot, cast: cast })
        .then(dbMovies => {
            console.log(`Created movies are:${dbMovies}`);
            res.redirect('/movies')
        })
        .catch(err => {
            console.error(`Error has been occured during the creating new movies: ${err}`)
            res.render("movies/new-movie")
        })
})

//item 8
router.get("/movies/:id", (req, res, next) => {
    const movieId = req.params.id;
    Movie.findById(movieId)
        .populate('cast')
        .then(dbMovie => {
            res.render("movies/movie-details", { movie: dbMovie })
        })
        .catch(err => {
            console.error(`Error has been occured during detail of the movie: ${err}`)
            next(err)
        })
})

//item 9

router.post("/movies/:movieId/delete", (req, res, next) => {
    const { movieId } = req.params;

    Movie.findByIdAndDelete(movieId)
        .then(() => res.redirect('/movies'))
        .catch(error => next(error));
});
//item 10

router.get("/movies/:movieId/edit", (req, res, next) => {
    const { movieId } = req.params;

    Promise.all([
        Movie.findById(movieId),
        Celebrity.find()])
        .then(response => {
            const movie = response[0];
            const celebrities = response[1];
            res.render("movies/edit-movie", { movie: movie, celebrities: celebrities })
        })
        .catch(error => next(error));
});
//item 10 - part 2
router.post("/movies/:movieId", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;
    const movieId = req.params.movieId;
    Movie.findByIdAndUpdate(movieId, { title, genre, plot, cast }, { new: true })
        .then(updatedMovie => res.redirect(`/movies/${movieId}`))
        .catch(error => next(error));
})
module.exports = router;