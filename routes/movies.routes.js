const router = require("express").Router();
const MovieModel = require("../models/Movie.model");
const CelebrityModel = require("../models/Celebrity.model");


router.get("/movies/create", (req, res, next) => {
    console.log("entra en get de movies");
    CelebrityModel.find()
        .then((celeb) => {
            console.log(celeb);
            res.render("../views/movies/new-movie", { celeb });
        })
        .catch((err) => next(err))

})

router.post("movies/create", (req, res, next) => {

    const { title, genre, plot, cast } = req.body;
    MovieModel.create({ title, genre, plot, cast })
        .then((newMovie) => {

            res.redirect("/movies")
        })
        .catch((err) => next(err));



})

module.exports = router;