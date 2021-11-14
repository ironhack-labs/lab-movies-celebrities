const router = require("express").Router();
const Movie = require("../models/movie.model")
// all your routes here

router.get("/new-movie", (req, res) => {
    res.render("new-movie");
}),

router.post("/new-movie", (req, res) => {
    const { theTittle, genre, plot, cast } = req.body;

    Movie.create({ theTittle, genre, plot, cast })

        .then(movies => res.render(("movies/movies"), movies))
        .catch(err => res.redirect("/new-movie", err))
})


 router.get("/movies", (req, res) => {
     const { id } = req.body;
    
    Movie.find(id)
        .then(movie => res.render("/movies", {movie}))
        .catch(err => console.log(err))
})
module.exports = router;