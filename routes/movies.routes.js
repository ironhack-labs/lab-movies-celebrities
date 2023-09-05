const router = require("express").Router();

const Movie = require("../models/Movie.model");

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body;

    Movie.create(req.body) // or Post.create({ name, occupation, catchPhrase })
      .then(() => {
        res.redirect("/celebrities")});
      })
      .catch((err) => {
       res.render("celebrities/new-celebrity", { error: 'Celebrity.'} )
      });



module.exports = router;