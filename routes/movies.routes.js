const router = require("express").Router();
const movieModel = require("../models/Movie.model");
const celebrityModel = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res) => {
  celebrityModel
    .find()
    .then((celebArr) => {
      res.render("movies/new-movie", { celebArr });
    })
    .catch((err) => console.log("Ups, that didn't work", err));
});

router.post("/create", (req, res) => {
  console.log(req.body);
  movieModel
    .create(req.body)
    .then(() => res.redirect("/movies"))
    .catch((err) => console.log("Oh, adding a movie did not work.", err));
});

module.exports = router;
