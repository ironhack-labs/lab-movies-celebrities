const router = require("express").Router();
const Movie = require('./../models/Movie.model.js')
const Celebrity = require('./../models/Celebrity.model.js')

router.get('/movies/create', (req, res) => {

    Celebrity
        .find()
        .then((celebrity) => {
            res.render("movies/new-movie.hbs", { celebrity });
        });
})

router.post("/movies/create", (req, res, next) => {
    const { tittle, genre, plot, cast } = req.body;
    Movie
        .create({ tittle, genre, plot, cast })
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/create");
        });
});

router.get('/movies', (req, res) => {
    Movie
        .find()
        .then(movies => {
            res.render('movies/movies', { movies })
        })
        .catch(err => console.log(err))
})

router.get('/movies/:id', (req, res) => {
    const { id } = req.params
    console.log("Antes del cast ->", id)
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            console.log("Este es el console log", movie)
            res.render('movies/movie-details', movie)
        })
        .catch(err => console.log(err))
})

router.post("/movies/:id/delete", (req, res) => {
    const { id } = req.params;

    Movie.findByIdAndDelete(id)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((err) => console.log(err));
});

router.get('/movies/:id/edit', (req, res) => {
    const { id } = req.params
    Movie
        .findById(id)
        .then(movie => {
            Celebrity
                .find()
                .then(celebrities => {
                    res.render('movies/edit-movie', { movie, celebrities })
                })
                .catch(err => console.log(err))
        })

})

router.post('/movies/:id/edit', (req, res) => {

    const { id } = req.params
    const { title, genre, plot, cast } = req.body

    Movie
        .findByIdAndUpdate(id, { title, genre, plot, cast })
        .then(() => {
            res.redirect(`/movies`)
        })
        .catch(err => console.log(err))

})



module.exports = router