const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", async (req, res) => {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", {allCelebrities});
});

router.post("/movies/create", async (req, res) => {
    try {
        const { title, genre, plot, cast } = req.body;
        await Movie.create({
            title,
            genre,
            plot,
            cast,
          });
          res.redirect("/movies");
    } catch (error) {
        console.log("An error accurred", error);
    }
});

router.get("/movies", async (req, res) => {
    const movies = await Movie.find().sort({ title: 1 });
    res.render("movies/movies", {movies});
});

router.get("/movies/:movieId", async (req, res) => {
    try {
        const movieDetail = await Movie.findById(req.params.movieId).populate("cast");
        res.render("movies/movie-details", movieDetail);
    } catch (error) {
        console.log("An error accurred", error);
    }
});

router.post("/movies/:movieId/delete", async (req, res) => {
    try {
        await Movie.findByIdAndRemove(req.params.movieId);
    } catch (error) {
        console.log("An error accurred", error);
    }
    res.redirect("/movies");
  });

  router.get("/movies/:movieId/edit", async (req, res) => {
    const movieToEdit = await Movie.findById(req.params.movieId).populate("cast");
    const allCelebrities = await Celebrity.find().sort({ name: 1 });
    res.render("movies/edit-movie", { movieToEdit, allCelebrities });
  });
  
  router.post("/books/:bookId/edit", async (req, res) => {
    const { title, description, rating, author } = req.body;
    await Book.findByIdAndUpdate(req.params.bookId, {
      title,
      description,
      rating,
      author,
    });
    res.redirect("/books");
  });

module.exports = router;