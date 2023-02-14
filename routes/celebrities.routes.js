// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase });

    res.render("celebrities/new-celebrity");
    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.get("/celebrities", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { allCelebrities });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
