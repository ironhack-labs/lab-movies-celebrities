const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      console.log(`New celebrity added to DB named ${celebrity.name}.`);
      res.redirect("/celebrities");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/celebrities/create");
    });
});

router.get("/celebrities", (rew, res) => {
  Celebrity.find()
    .then((allCelebritiesFromDB) => {
      console.log("Retrieved celebrities from DB:", allCelebritiesFromDB);
      res.render("celebrities/celebrities", {
        celebrity: allCelebritiesFromDB,
      });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);

      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

module.exports = router;
