const express = require("express");
const router = express.Router();

const { Movie } = require("../models/Movie.model");
const { Celeb } = require("../models/Celebrity.model");

router.get("/movies/create", async (req, res) => {
  try {
    const celebs = await Celeb.find({}, { name: 1 });
    console.log(celebs);
    res.render("movies/new-movie", { celebs });
  } catch (error) {
    res.render("error");
  }
});

router.post("/movies/create", async (req, res) => {
  try {
    const newMovie = new Movie({ ...req.body });
    await newMovie.save();
    res.redirect("/movies/movies");
  } catch (error) {
    res.render("error");
  }
});

router.get("/movies/movies", (req, res) => {
  res.render("movies/movies");
});

// router.post("/celebrities/create", async (req, res) => {
//     try {
//       const newCeleb = new Celeb({ ...req.body });
//       await newCeleb.save();
//       res.redirect("/celebrities");
//     } catch (error) {
//       res.render("error");
//     }
//   });

module.exports = router;
