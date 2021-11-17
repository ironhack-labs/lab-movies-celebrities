// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});
router.get("/", async (req, res, next) => {
  try {
    const celebritiesList = await Celebrity.find();
    res.render("celebrities/celebrities", { celebritiesList });
  } catch (error) {
    console.log(error);
  }
});
router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  try {
    const createCelebrity = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (error) {
    res.render("/celebrities/new-celebrity");
  }
});

module.exports = router;
