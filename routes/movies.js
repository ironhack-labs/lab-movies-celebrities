// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");
// all your routes here

router.get("/", (req, res, next) => {
    Movie.find({})
        .populate('cast', 'name')
        .then(movies => {
            console.log(movies)
            res.render('movies/movies', { movies });
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });
})

router.get('/create', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('movies/new-movie', { celebrities });
        }).catch(error => {
            console.log("Error", error);
            res.render("error");
        });

});


router.post('/create', (req, res, next) => {
    console.log(req.body)
    const { title, genre, plot, cast, ...rest } = req.body;
    Movie.create({
        title,
        genre,
        plot,
        cast
    }).then(movie => {
        console.log("movie created", movie);
        res.render('movies/movies');
    }).catch(error => {
        console.log("Error", error);
        res.render("error");
    });
});

module.exports = router;