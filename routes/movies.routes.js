// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");


// get movies page


router.get("/movies/create/:celebrity_id", (req, res, next) => {



    
    const id = req.params.celebrity_id

    Movie.findById(id)
        .populate("cast")
        .then(celebrityId => {

            res.render("movies/movies", celebrityId)

        })
        .catch(err => console.log(err))


})

router.post("/movies/create/:celebrity_id", (req, res) => {

    // const { }




})






router.get("/movies/create", (req, res, next) => {

    res.render("movies/movies")



})

router.post("/movies/create", (req, res, next) => {

    const { title, genre, plot } = req.body

    Movie.create({ title, genre, plot })
        .then(() => res.render("movies/new-movie"))
        .cath(err => console.log(err))


   

})











// const { id } = req.params

// Celebrity.findById(id)
//     .populate("name")
//     .then(celebrity => {
//         res.render("movie-details")
//     })








router.get("/movies", (req, res, next) => {
    res.render("movies/movies");
});

module.exports = router;
