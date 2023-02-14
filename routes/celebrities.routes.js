// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

const Movie = require("../models/Movie.model");

// all your routes here

router.get("/celebrities/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

router.post("/celebrities/create", async (req, res, next) => {
  try {
    // extract info from req.body
    const { name, occupation, catchPhrase } = req.body;
    // create the book in the db
    await Celebrity.create({ name, occupation, catchPhrase });

    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
    res.redirect("/celebrities/new-celebrity");
    next(error);
  }
});

router.get("/celebrities", async (req, res, next) => {
  try {
    let celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities }); // same name celebrities.hbs #each
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
