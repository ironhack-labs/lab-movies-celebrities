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
                res.render('movies/movies', { movies: resFromDB } );
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
module.exports = router;