const router = require("express").Router();

const Celebrities = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  Celebrities.find({})
    .then((createCelebs) => {
      res.render("celebrities/new-celebrity", { createCelebs });
    })
    .catch((err) => next(err));
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrities.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => res.render("/celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res, next) => {
  Celebrities.find()
    .then((celebs) =>{
      console.log(celebs)
      res.render("celebrities/celebrities", {celebs})

    }) 
    .catch((err) => next(err));
});


module.exports = router;
