const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

router.get("/movies/create", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find({});
    res.render("movies/new-movie", { celebrities });
  } catch (err) {
    console.log("err", err);
  }
});

router.post("/movies/create", async (req, res, next) => {
  try {
    await Movie.create(req.body);
    res.redirect("/movies");
  } catch (err) {
    res.render("/movies/create");
    console.log("err", err);
  }
});

module.exports = router;
