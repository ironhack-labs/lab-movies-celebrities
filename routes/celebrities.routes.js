// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});
router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    res.render("celebrities/new-celebrity");
  }
});
router.get("/celebrities", async (req, res, next) => {
  try {
    let celebrities = Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
