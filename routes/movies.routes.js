// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie =  require("../models/movie.model")
// all your routes here

router.get("/create", (re1,res) =>{
    Celebrity.find()
    .then(celebrities =>{
        res.render("movies/new-movie", {celebrities: celebrities})
    })
})

router.post("/create", (req, res) =>{
    Movie.create(req.body)
    .then(newMovie =>{
        console.log(newMovie);
        res.redirect("/movies")
    })
    .catch(err =>{console.log(err)})
})

router.get("/", (req,res) =>{
    Movie.find()
        .then(movies =>{
            console.log(movies);
            res.render("movies/movies", {movies : movies})
        })
        .catch(err =>{console.log(err)}) 
})

router.get("/:id", (req,res) =>{
    Movie.findById(req.params.id)
    .populate('cast')
    .then(details =>{
        console.log(details);
        res.render("movies/movie-details", details)
    })
    .catch(err =>{console.log(err)}) 
})

router.post("/:id/delete", (req,res) =>{
    Movie.findByIdAndRemove(req.params.id)
    .then(
        res.redirect("/movies")
    )
    .catch(err =>{console.log(err)}) 
})

router.get("/:id/edit", (req,res) =>{
    Movie.findById(req.params.id)
        .then((movie) => {
            console.log("Got movie", movie)
            return Celebrity.find()
            .then((celebrities) => {
                console.log("Render ", { celebrities: celebrities, movie: movie })
                res.render("movies/edit-movie", { celebrities: celebrities, movie: movie })
            }) 
        })
        .catch(err =>{console.log(err)}) 
})


router.post("/:id/edit", (req,res) => {
    Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(newMovie =>{
        res.redirect("/movies")
    })
    .catch(err =>{console.log(err)})
})
module.exports = router;