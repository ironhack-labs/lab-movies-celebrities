// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// Create - GET
router.get("/celebrities/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);
// Create - POST
router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { title, occupation, catchPhrase } = req.body;

    const createdCelebrity = await Celebrity.create({
      title,
      occupation,
      catchPhrase,
    });
    res.redirect(`/celebrities`);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// List - GET
router.get("/celebrities", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
