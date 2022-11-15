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
    const { title,  description, plot, cast } = req.body;
    Movie.create({title,  description, plot, cast})
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
    });
})

//Getting movies one by one
router.get('/movies/:movieId', (req, res) => {
    const { movieId } = req.params;
    Movie.findById(movieId)
    .populate('cast')
    .then(theMovie => res.render("movies/movie-details.hbs", { newMovie: theMovie }))
    .catch(error => {
      console.log("Error while retrieving movie details: ", error);
    });
});

//Deleting movies
router.post('/movies/:movieId/delete', (req, res) => {
    const { movieId } = req.params;
    console.log(movieId)
    Movie.findByIdAndRemove(movieId)
    .then(() => res.redirect('/movies'))
    .catch(error => {
        console.log("Error while getting movie from the DB: ", error);
    })
})

//Editing movies === get all parts
router.get("/movies/:movieId/edit", (req, res) => {
    const { movieId } = req.params; //must be the same name of ID as in the route!!!
    console.log(movieId)
    Movie.findById(movieId)
    .then(movieToEdit => {
        console.log(movieToEdit)
        Celebrity.find()
        .then(celebrity => {
            console.log(celebrity)
            res.render('movies/edit-movie', {movieToEdit, movieId, celebrity})
        })
    })
    .catch(error => {
        console.log("Error!!!", error);
    })
});

//Editing movies === posting changes
router.post('/movies/:movieId/edit',(req, res) => {
    const { movieId } = req.params;
    const { title, description, plot } = req.body
    Movie.findByIdAndUpdate(movieId , {title,  description, plot},  {new: true})
    .then(updatedMovie => {
        updatedMovie.save();
        console.log(updatedMovie)
       // res.redirect('/movies')
    })
    .then(() => res.redirect('/movies'))
    .catch(error => {
        console.log("Error while getting movie from the DB: ", error);
    })
})
module.exports = router;