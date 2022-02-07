const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model");

//create

router.get("/crear", (req, res, next) => {
  res.render("./celebrities/new-celebrity");
});

router.post("/crear", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/actores"))
    .catch((err) => res.redirect("/crear"));
});

//list

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) =>
      res.render("celebrities/celebrities", { celebrities })
    )
    .catch((err) => console.log(err));
});

//details

router.get("/detalles/:_id", (req, res, next) => {
  const { _id } = req.params;

  Celebrity.findById(_id)
    .then((celebrity) =>
      res.render("celebrities/celebrities-detail", celebrity)
    )
    .catch((err) => console.log(err));
});

//edit

//exports
module.exports = router;
