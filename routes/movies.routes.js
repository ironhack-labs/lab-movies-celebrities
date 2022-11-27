const router = require('express').Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

router.get('/movies/create', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
        res.render("movies/new-movie", { celebrities });
    } catch(err) {
        console.log(err);
    }
});

router.post('/movies/create', async (req, res, next) => {
    try {
        const { title, genre, plot, cast } = req.body;

        const newMovie = await Movie.create({ title, genre, plot, cast });

        res.redirect('movies');

    } catch(err) {
        res.render('movies/new-movie');
        console.log(err);
    }
});

router.get('/movies/movies', async (req, res, next) => {
    try {
        const movies = await Movie.find();
        res.render('movies/movies', { movies });
    } catch(err) {
        console.log(err);
    }
});

router.get('/movies/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findById(id).populate("cast");
        res.render("movies/movie-details", movie);
    } catch(err) {
        console.log(err);
    }
});

router.post('/movies/:id/delete', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndRemove(id);
        res.redirect("/movies/movies");
    } catch(err) {
        res.redirect("/movies/movies");
        console.log(err);
    }
});

router.get("/movies/:id/edit", async (req, res, next) => {
    try {
        const { id } = req.params;

        const celebrities = await Celebrity.find();

        const movie = await Movie.findById(id).populate("cast");

        res.render("movies/edit-movie", { celebrities, movie } );
    } catch(err) {
        console.log(err);
    }
});

router.post("/movies/:id/edit", async (req, res, next) => {
    try {
        const { id } = req.params;
        const editMovie = await Movie.findByIdAndUpdate(id, req.body, {new: true});
        res.redirect(`/movies/${id}`);
    }catch(err) {
        console.log(err)
        res.redirect("/movies/movies");
    }
});

module.exports = router;