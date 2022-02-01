// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

/*create the following GET route: /celebrities/create
 render the celebrities/new-celebrity view*/

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity.hbs");
});

// /celebrities/create POST route
router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  //create an instance of the celebrities model
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrityCreated) => {
      res.render("celebrities/celebrities", { celebrityCreated });
    })
    .catch((err) => {
      res.render("celebrities/new-celebrity.hbs");

      next(err);
    });
});

module.exports = router;
