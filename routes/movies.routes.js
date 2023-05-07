const router = require("express").Router();


const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')


// all your routes here
router.get("/movies", (req, res, next) => {
    Movie.find()
    .then(movieList => res.render('movies/movies.hbs' , {movieList}))
    .catch(err => console.log(err))
});


router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then(celebrityList => res.render("movies/new-movie.hbs" , {celebrityList} ))
});

router.post("/movies/create", (req, res, next) => {
    const { title , genre , plot , cast} = req.body

    Movie.create({title, genre, plot , cast})
    .then( ()  => res.redirect('/movies'))
    .catch( err => console.log(err))
});


router.get("/movies/:id", (req, res, next) => {
    const {id} = req.params
    Movie.findById(id)
    .populate('cast')
    .then(movie => res.render('movies/movie-details.hbs' , movie))
    .catch(err => console.log(err))
});

router.post("/movies/:id/delete", (req, res, next) => {
    const {id} = req.params
    Movie.findByIdAndDelete(id)
    .then( () => res.redirect('/movies'))
    .catch(err => console.log(err))
});

router.get("/movies/:id/edit", (req, res, next) => {
    const {id} = req.params
    Movie.findById(id)
    .then( movie => {
       Celebrity.find()
       .then(celebrityList => res.render('movies/edit-movie.hbs' , {movie , celebrityList}))
    }) 
    .catch(err => console.log(err))
});

router.post("/movies/:id/edit", (req, res, next) => {
    const {id} = req.params
    const { title , genre , plot , cast} = req.body
    Movie.findByIdAndUpdate(id , {title , genre , plot , cast})
    .then( () => res.redirect(`/movies/${id}`)) 
    .catch(err => console.log(err))
});

module.exports = router;