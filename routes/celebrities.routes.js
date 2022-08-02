// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => res.render("celebrities/celebrities.hbs", { celebrities: allCelebrities })) // second argument is what we are sending to the front end
    .catch((err) => {
      console.log("Error while displaying all celebrities");
      next(err);
    })
})


router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      console.log(`Created celebrity is ${createdCelebrity.name}`)
      res.redirect("/celebrities")
    })
    .catch((err) => res.render("celebrities/new-celebrity"));
})

module.exports = router;