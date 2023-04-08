const CelebModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

const router = require("express").Router();

// all your routes here
router.get("/create", async (req, res) => {
  const allCelebs = await CelebModel.find();
  res.render("movies/new-movie", { allCelebs });
});

router.post("/create", async (req, res) => {
  try {
    await MovieModel.create(req.body);
    res.redirect("/movies");
  } catch {
    res.redirect("/create");
  }
});

//   router.get("/celebs", async (req,res) => {
//       try {
//           const allCelebs = await CelebModel.find();
//           res.render("celebs/celebs", {allCelebs});

//       } catch {
//           res.send ("Oops, an error, go back");
//       }

//   })

module.exports = router;
