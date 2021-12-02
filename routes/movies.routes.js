// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();


const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

// all your routes here

//Route to create a movie

router.get("/create", async (req, res, next) => {
    try {
        const allCelebrities = await Celebrity.find();
        res.render("movies/new-movie.hbs", {allCelebrities});
    } catch(err){
        console.log(err)
    }
});

//Route to get all the movies

router.get("/", async (req, res, next) => {
    try{
      const allMovies = await Movie.find();
      res.render("movies/movies.hbs", {allMovies})
  } catch(err){
      console.log(err)
  }
  });

//Create movie post route

router.post("/create", async (req, res, next) => {
    const {title, genre, plot, cast} = req.body
    try{
        const newMovie = await Movie.create({title, genre, plot, cast})
        res.redirect("/movies")
    } catch(err){
        console.log(err)
        res.render("movies/new-movie.hbs", {Celebrities});
    }
});

//Route to get the details for one movie

router.get("/:id", async (req, res) => {
  try {
      const selectedMovie = await Movie.findById(req.params.id).populate('cast');
      res.render("movies/movie-details.hbs", selectedMovie);
  } catch(err) {
      res.render("not-found.hbs", { errorMsg: "Movie not found" });
  }
});

//Route for delete a movie selected by its ID 

router.post("/:id/delete", async (req, res) => {
  try {
      const deletedMovie = await Movie.findByIdAndRemove(req.params.id);
      res.redirect("/movies")
  } catch(err) {
      res.render("not-found.hbs", { errorMsg: "Movie not deleted" });
  }
});

//Route to edit a movie selected by its ID 

router.get("/:id/edit", async (req, res) => {
  try{
      const selectedMovie = await Movie.findById(req.params.id);
      const allCelebrities = await Celebrity.find();
      res.render("movies/edit-movie.hbs", {selectedMovie, allCelebrities})
  } catch(err){
      console.log(err)
  }
});

//Route post to edit a movie selected by its ID

router.post("/:id", async (req, res) => {
  console.log("edit")
  const {title, genre, plot, cast} = req.body
  try {
      const editeddMovie = await Movie.findByIdAndUpdate(req.params.id, {title, genre, plot, cast});
      res.redirect(`/movies/${req.params.id}`)
  } catch(err) {
      res.render("not-found.hbs", { errorMsg: "Movie not deleted" });
  }
});



module.exports = router;