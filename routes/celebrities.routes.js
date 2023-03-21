// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  Celebrity.create(req.body);
  res.send("Created new Celebrity");
});

router.get("/celebrities", (req, res, next) => {
  Celebrity.find({})
    .then((celebritiesArr) => {
      const data = {
        celebrities: celebritiesArr,
      };
      res.render("celebrities/celebrities", data);
    })
    .catch((err) => next(err));
});

module.exports = router;
