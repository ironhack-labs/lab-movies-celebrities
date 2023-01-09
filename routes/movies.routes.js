const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/movies/create", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("movies/new-movie", { celebrities });
    })
    .catch((error) => next(error));
});

router.post("/movies/create", (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  Movie.create({ title, genre, plot, cast })
    .then((newMovie) => {
      console.log(newMovie);
      res.redirect("/movies");
    })
    .catch((error) => next(error));
});

router.get("/movies", (req, res, next) => {
  Movie.find()
    .then((allMovies) => {
      res.render("movies/movies", { allMovies });
    })
    .catch((err) => next(err));
});

router.get("/movies/:movieID", (req, res, next) => {
  Movie.findById(req.params.movieID)
    .populate("cast")
    .then((movie) => {
      console.log(movie);
      res.render("movies/movie-details", movie);
    })
    .catch((err) => next(err));
});

router.post("/movies/:movieID/delete", (req, res) => {
  Movie.findByIdAndRemove(req.params.movieID)
    .then((deletedMovie) => {
      console.log(deletedMovie);
      res.redirect("/movies");
    })
    .catch((err) => next(err));
});

router.get("/movies/:movieID/edit", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    const movie = await Movie.findById(req.params.movieID);
    const celebritiesSelected = celebrities.map((celebrity) => {
      let selected = false;
      if (movie.cast.includes(celebrity._id)) {
        selected = true;
      }
      return { celebrity, selected };
    });
    res.render("movies/edit-movie", { celebritiesSelected, movie });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:movieID/edit", async (req, res, next) => {
    try{
        const {movieID:id} = req.params;
        // const { title, genre, plot, cast } = req.body
        await Movie.findByIdAndUpdate(id, req.body)
        res.redirect(`/movies/${id}`)
    }
    catch(err) {
        next(err)
    }
   
})

module.exports = router;
