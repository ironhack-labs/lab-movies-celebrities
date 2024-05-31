const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model")

router.get(`/`, (req, res) => {
    Movie.find().populate(`cast`).then((data) => {
        res.render(`movies/movies`, {movies: data});
    });
});


router.get(`/create`, (req, res) => {
    Celebrity.find().then((data) => {
        res.render(`movies/new-movie`, {celebrities: data});
    });
});

router.post(`/create`, (req, res) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create({ title, genre, plot, cast })
    .then(() => res.redirect(`/movies`));
});

router.get(`/:id`, (req, res) => {
    Movie.findById(req.params.id)
    .populate(`cast`).then((data) => {
        res.render(`movies/movie-details`, {movie: data});
    });
});

router.post(`/:id/delete`, (req, res) => {
    Movie.findByIdAndDelete(req.params.id).then(() => res.redirect(`/movies`))
});

router.get(`/edit/:id`, (req, res) => {
    Promise.all([
        Movie.findById(req.params.id),
        Celebrity.find()
    ])

    
    .then(([movie, celebrities]) => {
        res.render(`movies/edit-movie`, { movie, celebrities });
    });

   
});

router.post(`/:id/edit`, (req, res) => {
    const { title, genre, plot, cast } = req.body;
    Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast }, { new: true })
    .then(() => res.redirect(`/movies/${req.params.id}`));
});

module.exports = router;
