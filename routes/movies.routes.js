// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then((allCelebritiesFromDB) => {
            res.render("movies/new-movie", {celebritiesAr: allCelebritiesFromDB})
        })

        .catch((err) => {
            console.log("Error getting the information from the form cast label created for celebrities", err);
            next(err)
        })
})

router.post("/movies/create", (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    Movie.create({title, genre, plot, cast})
        .then(() => {
            res.redirect("/movies")
        })
        .catch((err) => {
            console.log("Error displaying the information from the form created for movies", err);
            next(err)
        })

})


router.get("/movies", (req, res, next) => { 
    Movie.find()
        .then((moviesFromDB) =>{
            const data = {
                moviesArr : moviesFromDB
            }
            res.render("movies/movies", data);
        })
        .catch((err) => {
            console.log("Error getting information from all the movies in the DB", err);
            next(err)
        })
})

router.get("/movies/:moviesId", (req, res, next) => {
    Movie.findById(req.params.moviesId)
        .populate("cast")
        .then((moviesFromDB) => {
            res.render("movies/movie-details", moviesFromDB)
        })
        .catch((err) => {
            console.log("Error getting information from all the movies in the DB", err);
            next(err)
        })
})


router.post("/movies/:moviesId/delete", (req, res, next) => {
    Movie.findByIdAndRemove(req.params.moviesId)
    .then(() => {
        res.redirect("/movies")

    })
    .catch((err) => {
        console.log("Error deleting a movie", err);
        next(err)
    })
})



router.get("/movies/:moviesId/edit", (req, res, next) => {
    const movieInfo = Movie.findById(req.params.moviesId).populate("cast")
    const celebrityInfo = Celebrity.find()

    .then(() => {
        

        res.render("movies/edit-movie", {movieInfo, celebrityInfo})
    })


    .catch((err) => {
        console.log("Error getting info for editting a movie", err);
        next(err)
    })
})


router.post("/movies/:moviesId/edit", (req, res, next) => {
    const {title, genre, plot, cast} = req.body;
    const newInfo = {title, genre, plot, cast};

    Movie.findByIdAndUpdate(req.params.moviesId, newInfo, {new : true})
        .then((moviesFromDB) => {
            res.redirect("/movies/" + moviesFromDB._id + "/edit");
        })

        .catch((err) => {
            console.log("Error editting a movie", err);
            next(err)
        })
})



module.exports = router;