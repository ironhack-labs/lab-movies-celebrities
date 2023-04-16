// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require Celebrity model in order to use it
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/celebrities", (req, res, next) => {
  const celebArr = Celebrity.find().then((celebArr) => {
    res.render("celebrities/celebrities", { celebArr });
  });
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findOne({ name, occupation, catchPhrase })
    .then((userDocFromDB) => {
      if (!userDocFromDB) {
        // prettier-ignore
        Celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'));
      } else {
        res.render("celebrities/create", {
          message: "It seems that celebrity is already in our database. ☀️",
        });
        return;
      }
    })
    .catch((err) =>
      console.log(`Error while creating a new celebrity: ${err}`)
    );
});

module.exports = router;
