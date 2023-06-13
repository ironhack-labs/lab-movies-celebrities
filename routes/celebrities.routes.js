// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
// all your routes here

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});
router.post("/celebrities/create", (req, res, next) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  console.log(newCelebrity);
  Celebrity.create(newCelebrity)
    .then(() => {
      res.redirect("/celebrities");
    })

    .catch((e) => {
      console.log(e);

      res.render("celebrities/new-celebrity");
    });
});
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebritiesArray) => {
      res.render("celebrities/celebrities", { celebritiesArray });
    })

    .catch((e) => {
      console.log(e);
    });
});
module.exports = router;
