// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrity/new", (req, res, next) =>
  res.render("celebrities/new-celebrity")
);

router.post("/celebrity/new", async (req, res, next) => {
  try {
    const { name, occupation, catchPhrase } = req.body;

    const createdCelebrity = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });

    res.redirect('/celebrities');

  } catch (error) {
    console.log(error);
    res.render("celebrities/new-celebrity")
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
