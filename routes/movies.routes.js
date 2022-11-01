const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model");


router.get("/create", (req, res, next) => {

    Celebrity.find()
    .then((celebritiesList) => {
        res.render("movies/new-movie.hbs", {celebritiesList})
    })
    .catch((err) => {
        next(err)
    })
})



router.post("/create", async (req, res, next) => {

    try{
        await Movie.create(req.body)
        res.redirect("/movies/movies-list")
    }
    catch (error) {
        next.error
    }

})


router.get("/movies-list", (req, res, next) => {
    Movie.find()
    .then((moviesList) =>{
        res.render("movies/movies.hbs", {
        moviesList
        })
    })
    .catch((error) =>{
        next(error)
    })
})

router.get("/:movieId", (req, res, next) => {
    const { movieId } = req.params

    Movie.findById(movieId)
    .populate("cast")
    .then((movie) =>{
        console.log(movieId)
        res.render("movies/movie-details.hbs", {
            movie
        })
    })
    .catch((error) =>{
        next(error)
    })


})

router.post("/:movieId/delete", (req, res, next) =>{

    const { movieId } = req.params

    Movie.findByIdAndRemove(movieId)
    .then(() =>{
        res.redirect("/movies/movies-list")
    })
    .catch((error) =>{
        next(error)
    })
})


router.get("/:movieId/edit", async(req, res, next) =>{

    const { movieId } = req.params

    try {
       const getMovie = await Movie.findById(movieId).populate("cast")
       const celebritiesList = await Celebrity.find()
       res.render("movies/edit-movie.hbs", {getMovie, celebritiesList})
       console.log("This is", getMovie.cast[0].name)
    }
    catch (error) {
       next(error)
    }

})


module.exports = router;