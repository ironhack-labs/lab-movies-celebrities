// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  // 1. Creer un enregistrement en base
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchphrase: req.body.catchphrase,
  })
    .then((celebrityFromDB) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("celebrities/new-celebrity");
      next(err);
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesFromDb) => {
      res.render("celebrities/celebrities", {allCelebrities: celebritiesFromDb})
    })
    .catch((err) =>{
      console.log("erreur",err)
    })
    
});

module.exports = router;
