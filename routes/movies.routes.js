// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

// all your routes here

router.get("/movies/create", async (req, res, next) => {
  try {
    let celebrities = await Celebrity.find();
    res.render("movies/new-movie", { celebrities }); // router.get("/books/create", is the URL, what the user sees.
  } catch (error) {
    next(error);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    //extract info from req.body

    const { title, genre, plot, cast } = req.body; // use the same names

    //create the book in the db
    await Movie.create({ title, genre, plot, cast }); // order os properties doesn't matter - more descriptive this way.

    //await Book.create(req.body) - Shorter version

    //redirect to the list again
    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies", async (req, res, next) => {
  //31 - 32

  try {
    // Book.find() without any arguments retrieves an array with all the books from the db
    let movies = await Movie.find(); // find is a method, always returns an array

    //render the view with the information
    res.render("movies/movies", { movies }); // because it's an array, get the books and send to the frontend
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    //get a single book by id
    //Single populate
    //const book = await Book.findById(id).populate('reviews')
    const movie = await Movie.findById(id).populate("cast");

    console.log(movie);

    res.render("movies/movie-details", movie);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndRemove(id);

    res.redirect("/movies");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const celebrity = await Celebrity.findOne(id);
    const movie = await Movie.findById(id);

    res.render("movies/edit-movie", { celebrity, movie });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, genre, plot, cast } = req.body;

    const { name, occupation, catchPhrase } = req.body;

    await Movie.findByIdAndUpdate(id, { title, genre, plot, cast });
    await Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase });

    res.redirect(`/movie-details`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
