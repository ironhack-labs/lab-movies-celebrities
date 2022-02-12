// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require('../models/Movie.model');

// all your routes here
router.get('/movies', (req , res , next) => {
    Movie.find()
            .populate('cast')
            .then(resFromDB => {
                console.log("Movies retrieved", resFromDB);
                let err = "hidden";
                if(req.query.error==="true"){
                    err = "";
                }
                res.render('movies/movies', { error: err, movies: resFromDB } );
            })
            .catch(err => {
                console.log("Error while finding the Movies", err);
            });
});

router.get('/movies/create', (req , res , next) => {
    Celebrity.find()
            .then(resFromDB => {
                console.log("Entered into the Movies form", resFromDB);
                let err = "hidden";
                if(req.query.error==="true"){
                    err = "";
                }
                res.render('movies/new-movie', { error: err, cast: resFromDB });
            })
            .catch(err => {
                console.log("Error while retrieving the celebirites to the Movie form ", err);
                res.redirect('/movies');
            });
});

router.post('/movies/create', (req , res , next) => {
    const { title, genre, plot , cast } = req.body;
    Movie.create({ title, genre, plot , cast })
        .then( resFromDB => {
            console.log("Movie created", resFromDB);
            res.redirect('/movies');
        })
        .catch(err => {
            console.log("Error while creating a new Movie", err);
            res.redirect('/movies/create?error=true');
        });
});

router.get('/movies/:id', (req , res , next) => {
    Movie.findById(req.params.id)
        .populate('cast')
        .then( resFromDB => {
            console.log("Movie details retrieved", resFromDB);
            res.render('movies/movie-details', { movie: resFromDB });
        })
        .catch(err => {
            console.log(`Error while retrieving the details of the Movie wit id ${req.params.id}`, err);
        });
});

router.post('/movies/:id/delete', ( req , res , next ) => {
    Movie.findByIdAndDelete(req.params.id)
        .then( resFromDB => {
            console.log("Movie deleted", resFromDB);
            res.redirect('/movies');
        })
        .catch(err => {
            console.log(`Error while deleting the Movie with id ${req.params.id}`, err);
            res.redirect('/movies?error=true');
        });
});

module.exports = router;