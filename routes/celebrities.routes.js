// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");
// all your routes here
router.get("/celebrities/create", (req, res) => {
  // Iteración 3, añadiendo una nueva Celebridad
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, ocupation, catchPhrase } = req.body;

  Celebrity.create({ name, ocupation, catchPhrase })
    .then((newCelebrity) => {
    //   console.log(`New Celebrity is: ${newCelebrity}`);
      res.redirect("/celebrities");
    })
    .catch((error) => res.render("/celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res) => {
  Celebrity.find()
    .then((celebritiesFromDB) => {
      // console.log(celebritiesFromDB);
      res.render("celebrities/celebrities", { celebrity: celebritiesFromDB });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);
      next(error);
    });
});
module.exports = router;
