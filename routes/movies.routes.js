const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// LIST 

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((moviesFromDB) => {
      res.render("movies/movies", { movie: moviesFromDB });
    })
    .catch((e) => {
      console.log("error getting movies....", e);
      next(e);
    });
});


// CREATE 

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebritieArr) => {
      const data = {
        celebrities: celebritieArr,
      };
      res.render("movies/new-movie", data);
    })
    .catch((e) => {
      console.log("error getting movie....", e);
      next(e);
    });
});

router.post("/movies/create", (req, res, next) => {
  const movieDetails = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot,
    cast: req.body.cast,
  };
  Movie.create(movieDetails)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((e) => {
      console.log("error getting movie....", e);
      next(e);
    });
});


// DETAILS

router.get("/movies/:movieId", (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .populate("cast")
    .then((movieFromDB) => {
      const data = { movie: movieFromDB};
      res.render("movies/movie-details", data);
    })
    .catch((error) => next(error));
});


//DELETE

router.post("/movies/:id/delete", (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((error) => console.error(error));
});


// EDIT

router.get("/movies/:id/edit",(req,res,next)=>{
    
    let movieDetails
    Movie.findById(req.params.id)
    .then(movieFromDB=>{
        movieDetails = movieFromDB
        return Celebrity.find()
    })
    .then(celebrityFromDB=>{
        const data = {movie: movieDetails, celebrity: celebrityFromDB};
        console.log(data.movie.cast)
        res.render("movies/edit-movie",data)
    })
    .catch((error) => console.error(error));
})

router.post("/movies/:id/edit",(req,res,next)=>{
    const {id} = req.params
    const {title,genre,plot,cast} = req.body
    Movie.findByIdAndUpdate(id, {title, genre, plot, cast}, {new: true})
    .then(updatedMovie=>{
        res.redirect(`/movies/${id}`)
    })
    .catch((error) => console.error(error));
})

module.exports = router;
