// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// route to GET the create celebrity page
router.get("/celebrities/create", (req, res) =>
  res.render("celebrities/new-celebrity")
);

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findOne({ name })
    .then((celebDocFromDB) => {
      if (!celebDocFromDB) {
        // prettier-ignore
        Celebrity.create({ name, occupation, catchPhrase })
          .then(() => res.redirect('/celebrities'));
      } else {
        res.render("celebrities/new-celebrity", {
          message: "It seems that the celebrity is already registered. ☀️",
        });
        return;
      }
    })
    .catch((err) => console.log(`Error while creating a new user: ${err}`));
});

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((celebDocFromDB) =>
      res.render("celebrities/celebrities", { celebrities: celebDocFromDB })
    )
    .catch((err) =>
      console.log(`Error while getting celebrities from the DB: ${err} `)
    );
});

module.exports = router;
