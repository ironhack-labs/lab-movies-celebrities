// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/movies/create", (req,res)=>{
    Celebrity.find()
    .then((allCelebrities)=>{
        res.render("../views/movies/new-movie", {allCelebrities})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.post("/movies/create", (req, res) => {
  const { title, genre, plot, cast} = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((oneMovie) => {
      console.log(oneMovie);
      return Celebrity.findByIdAndUpdate(cast, {
        $push: { movies: oneMovie._id }
      });
    })
    .then((updatedCast) => {
      console.log(updatedCast);
      res.redirect(`/movies`);
    })
    .catch((err) => {
      console.log(err);
      res.render("../views/movies/new-movie.hbs");
    });
});

router.get("/movies", (req, res) => {
  Movie.find().populate("cast")
  .then((allMovies) => {
    res.render("../views/movies/movies.hbs", { allMovies });
    console.log(allMovies)
  });
});

router.get("/movies/:id", (req, res) => {
  console.log(req.params.id);
  Movie.findById(req.params.id).populate("cast")
    .then((oneMovie) => {
      res.render("../views/movies/movie-details.hbs", oneMovie);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/:id/delete", (req, res) => {
  console.log(req.params);
  Movie.findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/movies/:id/edit", (req, res) => {
  console.log(req.params);
  Movie.findById(req.params.id)
    .populate("cast")
    .then((updateMovie) => {
      console.log(updateMovie);
      res.render("../views/movies/edit-movie.hbs", updateMovie);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/movies/:id/edit", (req, res) => {

  const { title, genre, plot, cast } = req.body;

  Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast })
    .then((updatedMovie) => {
      res.redirect("/movies");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
