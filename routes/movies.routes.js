const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();

router.get("/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find()
    res.render('movies/new-movie', { celebrities })
  } catch (error) {
    next(error)
  }
});

router.post("/create", async (req, res, next) => {
  try {
    await Movie.create(req.body)
    res.redirect('/movies')
  } catch (error) {
    next(error)
  }
});

router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find()
    console.log(allMovies)
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error)
  }
});

router.get("/:movieID", async (req, res, next) => {
  try {
    const movie = await Movie
      .findById(req.params.movieID)
      .populate("cast")
    res.render("movies/movie-details", movie);
  } catch (error) {
    next(error)
  }
});

router.post("/:movieID/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndRemove(req.params.movieID)
    res.redirect("/movies");
  } catch(error) {
    next(error)
  }
});

router.get("/:movieID/edit", async (req, res, next) => {
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

router.post("/:movieID/edit", async (req, res, next) => {
    try{
        await Movie.findByIdAndUpdate(req.params.movieID, req.body)
        res.redirect(`/movies/${req.params.movieID}`)
    }
    catch(err) {
        next(err)
    }
})

module.exports = router;