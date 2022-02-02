// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/movies/create', (req,res,next) => {
    Celebrity.find()
        .then(allCelebs =>{
            console.log(allCelebs)
            if(allCelebs){
                res.render('movies/new-movie',{celebs: allCelebs});
            }
        })
        .catch(err => console.log('Error while fetching celebrity: ' + err));
});

router.post('/movies/create', (req,res,next) => {
    const {title, genre, plot, cast} = req.body;
    Movie.findOne({title})
        .then((movie) => {
            if(!movie){
                Movie.create({title, genre, plot,cast})
                    .then(() => res.redirect('../movies/create'))
                    .catch(err => console.log('Error while creating movie' + err));
            }
            else{
                
            }
        })
        .catch(err => console.log('Error while creating movie: ' + err));
});

router.get('/movies', (req,res,next) => {
    Movie.find()
        .populate('cast')
        .then(allMovies => {
            if(allMovies){
                res.render('movies/movies',{movies: allMovies})
            }
        })
        .catch(err => console.log('Error while fetching movies: ' + err));
});

// router.get('/movies/:id', (req,res,next) => {

// })
module.exports = router;