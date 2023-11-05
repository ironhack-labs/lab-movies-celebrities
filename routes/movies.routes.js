const router = require("express").Router()
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model");
const { route } = require("./celebrities.routes");

router.get("/movies/create", (req, res) => {
    Celebrity.find().then((celebrities) => {
        res.render("movies/new-movie", { celebrities });
    });
});

router.get("/movies", (req, res) => {
    Movie.find().then((movies) => {
        res.render("movies/movies", { movies });
    });
});

router.post("/movies/create", (req, res) => {
    const { title, genre, plot, cast } = req.body
    Movie
        .create({ title, genre, plot, cast })
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => {
            res.send(err);
        });
});
router.get('/:_id', (req, res) => {
    const { _id } = req.params
    Movie
        .findById(_id).populate('cast')
        .then(movie => res.render('movies/movie-details', movie))
        .catch(err => console.log(err))
})

router.post('/movies/:_id/delete', (req, res) => {
    const { _id } = req.params
    Movie.findByIdAndRemove(_id)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})

router.get('/movies/:_id/edit', (req, res) => {
    const { _id } = req.params
    Movie
        .findById(_id).populate('cast')
        .then(movie => {
            Celebrity
                .find()
                .then(celebs => {
                    res.render('movies/edit-movie', { movie: movie, celebrity: celebs })
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
})
router.post('/movies/:_id/edit', (req, res) => {
    const { _id } = req.params
    Movie
        .findByIdAndUpdate(_id, req.body)
        .then(() => res.redirect('/movies'))
        .catch(err => console.log(err))
})
module.exports = router;