// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/", async (req, res, next) => {
  try {
    const celebrities = await Celebrity.find();
    res.render("celebrities/celebrities", { celebrities });
  } catch (error) {
    res.render("error", { error });
  }
});
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
  const { body } = req;
  try {
    const celebritiy = await Celebrity.create(body);
    res.redirect("/");
  } catch (error) {
    res.render("error", { error });
  }
});

module.exports = router;
