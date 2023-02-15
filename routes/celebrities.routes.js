const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");


router.get('/celebrities', async (req, res, next) => {
    try {
      
      let celebrities = await Celebrity.find();

      res.render('celebrities/celebrities.hbs', { celebrities });
    } catch (error) {
      console.log(error);

    }
  });

router.get("/celebrities/create", (req, res) =>
  res.render("celebrities/new-celebrity")
);

router.post("/celebrities/create", async (req, res, next) => {
  try {
    const { name, occupation, quotes } = req.body;

    await Celebrity.create({ name, occupation, quotes });

    res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
  }
});



module.exports = router;
