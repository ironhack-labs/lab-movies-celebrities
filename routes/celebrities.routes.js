// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrity/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});
// get
router.get("/celebrities", (req, res, next) => {
  // Get all celebrities from db
  Celebrity.find()
    .then((celebrityFromDB) => {
      console.log(celebrityFromDB);
      res.render("celebrities/celebrities", { celebrities: celebrityFromDB });
    })
    .catch((err) => next(err));
});
// post
router.post("/celebrities", (req, res, next) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
      console.log(createdCelebrity);
      // Redirect to celebrity details route
      res.redirect(`/celebrities`);
    })
    .catch((err) => next(err));
});

// all your routes here
module.exports = router;
