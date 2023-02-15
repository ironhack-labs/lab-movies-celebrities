const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

router.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});

router.post("/movies/create", async (req, res, next) => {
  try {
    const { title, genre, plot } = req.body;
    await Movie.create({ title, genre, plot });
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
    res.redirect("/new-movie");
  }
});

router.get("/movies", async (req, res, next) => {
  try {
    let movies = await Movie.find();
    res.render("movies/movies", { movies });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies/:id/details", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id).populate('cast')
    res.render("movies/movie-details", { movie });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/:id/delete", async(req, res, next) => {
    try {
        const {id} = req.params;
        await Movie.findByIdAndDelete(id)
        res.redirect("/movies")
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndUpdate(id);
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.render("movies/edit-movie", movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, description, cast } = req.body;

    await Movie.findByIdAndUpdate(id, { title, genre, description, cast });

    res.redirect(`/movies/${id}`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});


router.get;

module.exports = router;
