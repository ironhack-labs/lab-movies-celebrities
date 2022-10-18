// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model.js");
// all your routes here

//GET /movies/create form to create celebrity
router.get("/create", async (req, res, next) => {
  try {
    let celebritiesList = await Celebrity.find();
    res.render("movies/new-movie.hbs", {
      celebritiesList,
    });
  } catch (error) {
    next(error);
  }
});

//POST /movies/create data from form to create celeb and save it in DB

router.post("/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;

  if (!title || !genre || !plot || !cast) {
    res.render("movies/new-movie");
  }

  try {
    await Movie.create({ title, genre, plot, cast });
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

router.post("/create");
module.exports = router;
