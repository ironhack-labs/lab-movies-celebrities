const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

router.get("/movies/create", (req, res, next) => {
   Celebrity.find()
    
    .then((CelebrityData) => {
        console.log(CelebrityData)
        res.render("movies/new-movie", {CelebrityData})
    })
    .catch(error => {
        console.log("error in creating a new movie", error)
    })
})

router.post("/movies/create", (req, res, next)=> {
    //const castArr = req.
    const moviesDetails = {
        title:req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast,
    }

    Movie.create(moviesDetails)
    .then(moviesDetails => {
        res.redirect("/movies/movies") 
    })
    .catch(error => {
        console.log("error in creating a new movie", error)
    })
})


router.get("/movies", (req, res, next) => {
    Movie.find()
    .then((movieA) => {
        console.log(movieA)
        res.render("movies/movies", {movieA})
    })
    .catch(error => {
        console.log("error in creating a new movie", error)
    })
})

router.get("/movies/:id", (req, res, next)=> {
    Movie.findById(req.params.id)
    .populate("cast")
    .then((movieDetails)=> {
        res.render ("movies/movie-details", movieDetails);
    })

    .catch(error => {
        console.log("error in creating a new movie", error)
    })
})

router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(()=> {
            res.redirect("/movies")
        })

        .catch(error => {
            console.log("error in creating a new movie", error)
        })
})
router.get("/movies/:id/edit", (req, res, next) => {
    let movieInfo
    Movie.findById(req.params.id)
    .then((movieDetails)=> {
        movieInfo= movieDetails
        return CelebrityModel.find()
        
    })

    .then(allCelebrities => {
        res.render("movies/edit-movie", {movieInfo, allCelebrities});
    })
    .catch(error => {
        console.log("error in creating a new movie", error)
    })
})



router.post("/movies/:id/edit", (req, res, next) => {
    const movieId= req.params.id

    const newDeets = {
        title: req.body.title,
        genre: req.body.genre,
        plot: req.body.plot,
        cast: req.body.cast
    }
    Movie.findByIdAndUpdate(movieId, newDeets)
    .then(() => {
        res.render("movies/movie-details")
    })
    .catch(error => {
        console.log("error in creating a new movie", error)
    })
   
})

module.exports = router;