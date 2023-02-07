// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celeb = require("../models/Celebrity.model");

// all your routes here

router.get("/celebs", (req, res) => {
  // console.log("sending router");
  res.send("hello from celebs route!");
});

// render create new celeb page
router.get("/celebs/create", (req, res, next) => {
  res
    .render("celebs/new-celeb")
    .then((data) => console.log(data))
    .catch((err) => next(err));
});

//render celeb detail page
router.get("/celebs/:id", (req, res, next) => {
  const celebId = req.params.id;
  Celeb.findById(celebId)
    .then((celebsFromDB) => {
      console.log(celebsFromDB);
      res.render("celebs/detail", { celeb: celebsFromDB });
    })
    .catch((err) => next(err));
});

// submit new celeb
router.post("/celebs", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celeb.create({ name, occupation, catchPhrase })
    .then((newCeleb) => {
      console.log(newCeleb);
      res.redirect(`/celebs/${newCeleb._id}`);
    })
    .catch((err) => next(err));
});

module.exports = router;
