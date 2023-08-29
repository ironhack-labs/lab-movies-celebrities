// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")



// all your routes here

// CREATE: create new movie
router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
        .then((result) => {
            res.render("movies/new-movie", { celebrities: result });
        })
})
module.exports = router;


// CREATE: create new movie
router.post("/movies/create", (req, res, next) => {
    console.log(req.body);
    Movie.create(req.body)
        .then(() => { res.redirect("/movies") })
})
module.exports = router;

// GET: display all movies
router.get("/movies", (req, res, next) => {
    Movie.find()
        .then((result) => {
            res.render("movies/movies", { movies: result })
        })
        .catch((e) => console.log("could not get movie list " + e))
})

// GET: display single movie detail
router.get("/movies/:id", (req, res, next) => {
    Movie.findById(req.params.id).populate("cast")
        .then((result) => {
            console.log(result)
            res.render("movies/movie-details", result)
        })
        .catch((e) => console.log("error finding the movie details " + e))
})


// POST: delete single movie
router.post("/movies/:id/delete", (req, res, next) => {
    Movie.findByIdAndRemove(req.params.id)
        .then(() => res.redirect('/movies'))
        .catch((e) => console.log("error deleting the movie " + e))
})

// GET: edit single movie
router.get("/movies/:id/edit", (req, res, next) => {
    async function renderMovie() {
        try {
            const result = await Movie.findById(req.params.id);
            result.celebrities = await Celebrity.find();
            console.log(result)
            res.render('movies/edit-movie', result)
        }
        catch(e) {console.log("error editing the movie " + e)}

    }
    renderMovie()
})

// POST: edit single movie
router.post("/movies/:id", (req, res, next) => {
    async function updateMovie() {
        try{
            await Movie.findByIdAndUpdate(req.params.id, req.body)
            res.redirect("/movies/"+req.params.id)
        }
        catch(e) {console.log("error editing the movie " + e)}
    }
    updateMovie()
})