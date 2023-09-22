// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/movies/create", (req, res) => 
{
    Celebrity.find()
    .then((celebrities) => 
    {
        res.render("movies/new-movie", {celebrities});
    })
    .catch((err) => 
    {
        console.log("Error getting celebrities", err)
    })
})

router.post("/movies/create", (req, res, next) => 
{
    const {title, genre, plot, cast} = req.body;

    Movie.create({title, genre, plot, cast})
    .then(() => res.redirect("/movies"))
    .catch((err) => { 
        res.render("movies/new-movie")
        next(err)
    })
})

router.get("/movies", (req, res, next) => 
{
    Movie.find()
    .then((allMovies) => 
    {
        console.log("All movies displayed!")
        res.render("movies/movies.hbs", {allMovies});
    })
    .catch((err) => 
    {
        console.log("Something went wrong while getting movies", err)
        next(err)
    })
})

router.get("/movies/:id", (req, res, next) => 
{
    const id = req.params.id;

    Movie.findById(id)
    .populate("cast")
    .then((movie) => 
    {
        res.render("movies/movie-details", movie)
    })
    .catch((err) => 
    {
        console.log("Error when display details of movies", err)
        next(err)
    })
})

router.post("/movies/:id/delete", (req, res, next) => 
{
    const id = req.params.id;

    Movie.findByIdAndRemove(id)
    .then((movieDeleted) => 
    {
        console.log("Movie deleted: ", movieDeleted)
        res.redirect("/movies")
    })
    .catch((err) => 
    {
        console.log("Something went wrong when deleting movie", err)
        next(err)
    })
})

    router.get('/movies/:movieId/edit', (req, res, next) => {
      const { movieId } = req.params;

      Movie.findById(movieId)
        .populate('cast')
        .then(movietoEdit => {
          Celebrity.find()
          .then((celebrities) => {
            res.render('movies/edit-movie',{movie: movietoEdit, celebrities});
          })

        })
        .catch(error => next(error));
    });

router.post("/movies/:id/edit", (req, res, next) => 
{
    const id = req.params.id;
    const {title, genre, plot, cast} = req.body;

    Movie.findByIdAndUpdate(id, {title, genre, plot, cast}, {new: true})
    .then((movieUpdated) => 
    {
        console.log("Movie updated", movieUpdated)
        res.redirect(`/movies/${id}/edit`);
    })
    .catch((err) => 
    {
        console.log("Something went wrong", err)
        next(err)
    })
})

module.exports = router;