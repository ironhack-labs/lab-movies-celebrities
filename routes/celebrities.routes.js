const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

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