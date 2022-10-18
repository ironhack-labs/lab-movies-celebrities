// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//GET /celebrities/create form to create celebrity
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

//POST /celebrities/create data from form to create celeb and save it in DB
router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  if (!name || !occupation || !catchPhrase) {
    res.render("celebrities/new-celebrity");
  }

  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (error) {
    next(error);
  }
});

// GET /celebrities list all the celebrities
router.get("/", async (req, res, next) => {
    try {
        const celebritiesList = await Celebrity.find().select({name: 1})
        
        res.render("celebrities/celebrities.hbs", {
            celebritiesList
        })
    } catch (error) {
        next(error)
    }
})

module.exports = router;
