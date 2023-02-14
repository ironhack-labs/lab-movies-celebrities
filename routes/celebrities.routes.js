// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities/create", (req, res, next) => {
  try {
    res.render("celebrities/new-celebrity");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity");
    console.log(error);
    next(error);
  }
});

router.get("/celebrities", async (req, res, next) => {
  try {
    let celebrity = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrity });
  } catch (error) {
    console.log(error)
    next(error)
  }
});

module.exports = router;
