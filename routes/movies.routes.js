const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get('/movies', async (req, res) => {
    const allTheMovies = await Movie.find();

    res.render('movies/movies', { allTheMovies });
});

router.get('/movies/create', async (req, res) => {
    const allCelebrities = await Celebrity.find().sort({ name: 1 });

    res.render('movies/new-movie', { allCelebrities });
});

router.post('/movies/create', async (req, res) => {
    const { title, genre, plot, cast } = req.body;

    await Movie.create(
        { title, genre, plot, cast }
    );

    res.redirect("/movies");
});

router.get("/movies/:movieId", async (req, res) => {
    const movieDetail = await Movie
        .findById(req.params.movieId)
        .populate("cast");

    console.log(movieDetail);


    res.render("movies/movie-details", movieDetail);
});

router.get("/movies/:movieId/edit", async (req, res) => {
    const allCelebrities = await Celebrity.find().sort({ name: 1 });
    const movieToEdit = await Movie.findById(req.params.movieId);

    res.render("movies/edit-movie", { movieToEdit, allCelebrities });
});

router.post("/movies/:movieId/edit", async (req, res) => {
    const { title, genre, plot, cast } = req.body;
    await Movie.findByIdAndUpdate(req.params.movieId, {
        title, genre, plot, cast,
    });

    res.redirect('/movies');
});

router.post("/movies/:movieId/delete", async (req, res) => {
    await Movie.findByIdAndDelete(req.params.movieId);
    res.redirect("/movies");
});

module.exports = router;