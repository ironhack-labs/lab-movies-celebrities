// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/", async (req, res, next) => {
  try {
    const allMovies = await Movie.find().populate("cast");
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

router.get("/create", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("movies/new-movie", { allCelebrities });
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  // destructuration on an object
  try {
    const { title, genre, plot, cast } = req.body;

    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id).populate("cast");
    console.log(oneMovie);
    res.render("movies/movie-details", { oneMovie });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.get("/:id/edit", async (req, res, next) => {
  try {
    const oneMovie = await Movie.findById(req.params.id);
    const allCelebrities = await Celebrity.find();

    // mongoose stores the actual document inside document._doc, and only allows us to access it through a getter function. this is a hacky way to retrieve the actual document and edit it
    const mappedCelebrities = allCelebrities.map((celeb) => celeb._doc);

    mappedCelebrities.forEach((celeb) => {
      oneMovie.cast.forEach((star) => {
        if (celeb._id.equals(star._id)) {
          celeb.isSelected = true;
        }
      });
    });

    res.render("movies/edit-movie", {
      allCelebrities: mappedCelebrities,
      oneMovie,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async (req, res, next) => {
  try {
    const { title, genre, plot, cast } = req.body;

    await Movie.findByIdAndUpdate(req.params.id, { title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});


module.exports = router;
