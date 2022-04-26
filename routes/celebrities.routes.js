const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

const router = require("express").Router();

/* CREAT */
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity")
});

router.post("/create", (req, res, next) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  }
  // console.log(newCelebrity)
  Celebrity.create(newCelebrity)
    .then((celebritiesFromDb) => {
      // console.log(celebritiesFromDb)
      res.redirect("/celebrities");
    })
    .catch(err => {
      console.log("error creating celebrities from DB", err)
      res.render("celebrities/new-celebrity");
    });
});

/* READ */
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesArr) => {
      // console.log(celebritiesArr)
      res.render("celebrities/celebrities", { celebrities: celebritiesArr });
    })
    .catch(err => {
      console.log("error getting celebrities from DB", err)
      next(err);
    });
});







module.exports = router;