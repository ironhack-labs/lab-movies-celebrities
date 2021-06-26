const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all localhost:3000/movies routes here:
router.get("/", (req, res, next) => {
        Movie
        .find({})
        .populate('cast')
        .then( movies => {
            // res.send(movies)
            res.render('movies/movies', {movies})
        })
    });

router.get("/create", (req, res, next) => {
    Celebrity
    .find({})
    .then( celebrities => {
        res.render('movies/new-movie', {celebrities})
    }
    )
    
});

    
router.post("/create", (req, res, next) => {
    const movie = req.body
    const {title, image, genre, plot, cast} = movie
    const validationConst = title && genre && image && plot 

    if(!validationConst){
        res.render('movies/new-movie', {errorMessage: `All fields are mandatory.`})
        return
    }   

    Movie
        .findOne({title})
        .then( foundMovie => {
            if(foundMovie){
                res.render('movies/new-movie', {errorMessage: `${movie} already registered.`})
                return
            }
        })

    Movie
        .create( movie)
        // .then( () => res.send(movie))
        .then( () => res.redirect('/movies'))
        .catch(err => console.log(err))
});

router.get('/:id', (req, res, next) => {
    // res.send("Success!!!")
    const {id} = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
})

router.post('/:id/delete', (req, res, next) => {
    const {id} = req.params
    Movie   
        .findByIdAndRemove(id)
        .then(deleted => {
            res.redirect('/movies')
        })
        .catch(err => res.send("Error. Can't delete, can't programm."))
})


router.get("/:id/edit", (req, res, next) => {
    const {id} = req.params
    Movie
        .findById(id)
        .populate('cast')
        // .then( movie => res.send({movie} ))    
        .then( movie => res.render('movies/edit-movie', movie ))    
});

router.post('/:id/edit', (req, res, next) => {
    const {id} = req.params
    const {title, genre, image, plot, cast} = req.body
    Movie
        .findByIdAndUpdate(id, {title, genre, image, plot})
        .then( () => res.redirect('/movies'))
        .catch( (err) => res.send(`Get a grip. You've got errors: ${err}`))
        
})

// router.get("/movie-details", (req, res, next) => {
//     res.render('movies/movie-details')
// });



module.exports = router;