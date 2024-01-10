// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
//Route to display all Celebrities
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((allCelebrities) => {
      res.render("celebrities/celebrities", { celebrities: allCelebrities });
    })
    .catch((err) => {
      next(err);
    });
});

//Routes to Add New Celebrity
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  })
    .then((result) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.redirect("/new-celebrity");
    });
});

module.exports = router;