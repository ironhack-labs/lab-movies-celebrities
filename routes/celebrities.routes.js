const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;

    const createCelebrity = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });

    console.log(createCelebrity);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
