// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// Getting our Schema
const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

//GETting route to render our new movie(it'll go on front end, here we'll fill out our form ) end point
router.get('/movies/create', (req, res) => {
    Celebrity.find()
    .then(allCelFromDB => {
        //console.log('Retrieved celebrities from DB:', allCelFromDB );
        res.render('movies/new-movie.hbs', { allCelebrities: allCelFromDB });
    })
    .catch((error) => {
        console.log("Error while getting the movies from the DB: ", error);
    });
});

//POST
router.post('/movies/create', (req, res) => {
    console.log("HEY!!")
    const { title, description, plot, cast } = req.body;
    Movie.create({title, description, plot, cast})
    .then((result) => console.log(result))
    .then(() => res.redirect('/movies'))
    .catch(error => res.render('movies/new-movie.hbs'));
})
//populate check it out 

//LIST all
router.get('/movies', (req, res) => {
    Movie.find()
    .then(allMFromDB => {
        console.log('Retrieved movies from DB:', allMFromDB );
        res.render('movies/movies.hbs',  { allMovies: allMFromDB });
    })
    .catch((error) => {
        console.log("Error while getting movie from the DB: ", error);
       // next(error);
    });
})

//Getting movies one by one
router.get('/movies/:movieId', (req, res) => {
    const { movieId } = req.params;
    Movie.findById(movieId)
    .populate('cast')
    //.then((theMovie) => console.log("movies/movie-details.hbs", theMovie))
    .then(theMovie => res.render("movies/movie-details.hbs", { newMovie: theMovie }))
    .catch(error => {
      console.log("Error while retrieving movie details: ", error);
    });
});

//Deliting movies
router.post('/movies/:movieId/delete', (req, res) => {
    const { mId } = req.params;
    Movie.findByIdAndRemove(mId)
    .then(() => res.redirect('/movies'))
    .catch(error => {
        //???????
        console.log("Error while getting movie from the DB: ", error);
    })
})
module.exports = router;