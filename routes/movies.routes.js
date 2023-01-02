const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

// creating a movie
router.get('/movies/create', (req, res, next) =>{

    Celebrity.find()
    .then(celebritiesArr => {
        res.render("movies/new-movie", {celebritiesArr})
    })
    .catch(err=>{
        console.log(`We have an error creating a movie`,err)
    })
})

router.post('/movies/create',(req,res,next)=>{
    const{ title, genre, plot, cast} = req.body

    Movie.create({ title, genre, plot, cast})
        .then(() => {
            res.redirect("/movies")

        })
        .catch(error =>{
            console.log(`We have an error creating a movie`, error)
            res.redirect("/movies/new-movie")
        })
})

// listing the movies
router.get('/movies', (req, res, next) => {

    Movie.find()
    .then(moviesArr => {
        res.render('movies/movies', {moviesArr})
    })
    .catch(error => console.log(error))
})

// display movies details
router.get('/movies/:id', (req, res, next) => {
    const {id} = req.params;

    Movie.findById(id)
    .populate('cast')
    .then(movie => {
        console.log(movie)
        res.render('movies/movie-details', movie)
    })
    .catch(error => console.log(error))
})

//deleting movies
router.post("/movies/:id/delete",(req,res,next)=>{
    const {id} = req.params;

    Movie.findByIdAndDelete(id)
        .then(()=>{
            res.redirect("/movies")
        })
        .catch(error => console.log(`We have an error deleting a movie`, error))    
})

// edit movies
router.get("/movies/:id/edit", async (req,res,next) => {
    const {id} = req.params;

    try {
        const movie = await Movie.findById(id).populate('cast');
        const celebrities = await Celebrity.find()
        const data = {
            movie:movie,
            celebrities : celebrities
        }

        res.render("movies/edit-movie", data)

    } catch (error) {
        console.log(error)
    }
})

router.post('/movies/:id/edit', (req, res, next) => {
    const {id} = req.params;

    const {title, genre, plot, cast} = req.body;

    Movie.findByIdAndUpdate(id,{title, genre, plot, cast})
    .then(() => {
        res.redirect(`/movies/${id}`)
    })
    .catch(error => console.log(error))
})


module.exports = router;