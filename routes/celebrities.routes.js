// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model ");

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
  });

router.post("/celebrities/create", (req, res, next) => {
        const createdCelebrity = req.body;
        console.log(createdCelebrity)
              Celebrity.create(createdCelebrity)
              .then(() => res.redirect('/celebrities'));
      // falta o erro
    });

router.get("/celebrities", (req, res, next) => {
        Celebrity.find()
        .then (celebritiesFound => {
        console.log(celebritiesFound)
        res.render("celebrities/celebrities", {celebritiesFound})
})
        .catch(err => console.log(err))
    });

module.exports = router;