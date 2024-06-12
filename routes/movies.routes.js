const router = require("express").Router();

const movieModel = require("../models/Movie.model")
const celebritiesModel = require("../models/Celebrity.model")


router.get('/movies', (req,res,next) => {

    movieModel.find()
        .then((movies) => {
            console.log(movies);
            res.render("movies/movies", {movies}) 
        })
        .catch(e => {
            console.log('Error with list of celebrities', e);
            next(e)
        })

})


router.get("/movies/create", (req,res,next) => {
    celebritiesModel.find()
        .then((celebritiesFromDB) => {
            res.render('movies/new-movie', { celebritiesFromDB })
        })
        .catch(e => {
            console.log('Error Create movie', e);
            next(e)
        })
})

router.post("/movies/create", (req, res, next) => {
    const newMovie={
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    movieModel.create(newMovie)
        .then((movieFromDB) => {
            res.redirect("/movies")
        })
        .catch(e => console.log("error with reception of form movie"))
})

router.get("/movies/:Id", (req, res, next) => {
    const id = req.params.Id

    movieModel.findById(id)
        .populate('cast')
        .then( (moviesById) => {
            console.log(moviesById);
            res.render("movies/movie-details", moviesById)
        })
        .catch(e => {
            console.log('error with id of movies', e);
            next(e)
        })
})

router.post("/movies/:id/delete", (req,res, next)=> {
    const id = req.params.id
    movieModel.findByIdAndRemove(id)
        .then(() => {
            res.redirect("/movies")
        })
        .catch(e => console.log('delete error', e))
})

router.get("/movies/:id/edit", (req,res, next) => {
    const id = req.params.id

    let celebrities;

    celebritiesModel.find()
        .then((celebFromDB) => {
            celebrities = celebFromDB
            console.log(id);
            return movieModel.findById(id)
        })
        .then((movieFromDB) => {
            res.render("movies/edit-movie", {movieDB: movieFromDB, celebrity: celebrities})
        })
        .catch(e => console.log(e));
})

router.post("/movies/:id/edit", (req, res, next)=> {
    const id = req.params.id
    const editMovies = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    movieModel.findByIdAndUpdate(id, editMovies)
        .then((editMovies) => {
            res.redirect("/movies")
        })
        .catch(e => console.log(e))


})
module.exports = router;