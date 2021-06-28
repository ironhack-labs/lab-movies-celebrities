const MovieModel = require("../models/Movie.model");

const CelebrityModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/movies/create", (req, res, next)=> {
    CelebrityModel.find()
    .then((celebrities) => {
        res.render("movies/new-movie.hbs", {celebrities}) 
    })
    .catch((err) => {
        next(err)
    })
 })


 router.post("/movies/create", (req, res, next)=>{
    const {title, genre, plot, cast} = req.body

    MovieModel.create({title, genre, plot, cast})
    .then(()=>{
        res.redirect("/movies")
    })
    .catch(()=>{
        res.render("movies/new-movie.hbs")
    })
})


router.get("/movies", (req, res, next)=>{
    MovieModel.find()
    .then((movies, celebrities)=>{
        res.render("movies/movies.hbs", {movies, celebrities})
    })
    .catch((err)=>{
        console.log(err)
        next(err)
    })
})

router.get("/movies/:id", (req, res, next)=>{
    let dynamicId = req.params.id

    MovieModel.findById(dynamicId)
    .populate("cast")
    .then((movie)=>{
        res.render("movies/movie-details.hbs", {movie})
    })
    .catch((err) => {
        next(err)
    })
})


router.post('/movies/:id/delete', (req, res, next) => {
    let dynamicId = req.params.id

    TodoModel.findByIdAndDelete(dynamicId)
        .then(() => {
            res.redirect('/movies')
        })
        .catch((err) => {
            next(err)
        })

})


router.get('/movies/:id/edit', (req, res, next) => {
    let dynamicId = req.params.id

  
    MovieModel.findById(dynamicId)
        .then((movie) => {
            return movie
        })
        .then((movie)=> {
            CelebrityModel.find({})
            .then((celebrities) => {
                res.render('movies/edit-movie.hbs', {celebrities, movie})
            })
            .catch((err) => {
                next(err)
            })
        })
        .catch((err) => {
            next(err)
        })
})


router.post('/movies/:id', (req, res, next) => {
    let dynamicId = req.params.id
    const {title, genre, plot, cast} = req.body

    MovieModel.findByIdAndUpdate(dynamicId, {title, genre, plot, cast})
        .then(() => {
            res.redirect('/movies/' + dynamicId)
        })
        .catch((err) => {
            next(err)
        })
})

module.exports = router;
