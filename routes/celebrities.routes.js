// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, nex) => {
  const newCelebrity = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase,
  };
  Celebrity.create(newCelebrity)
    .then((response) => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      console.log("There was an error creating new celebrity", err);
      res.render("celebrities/new-celebrity");
      next();
    });
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => {
      console.log(
        "There was an error getting all the celebrities from DB",
        err
      );
      next();
    });
});
module.exports = router;
