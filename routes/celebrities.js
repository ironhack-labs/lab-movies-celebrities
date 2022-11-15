// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model"); // <== add this line before your routes

///////////////////////////////////////////////////////////////////////////
// GET route to retrieve and display all celebrities

router.get("/celebrities", (req, res, next) => {
  return Celebrity.find()
    .then((celebrities) => {
      console.log("Retrieved celebrities from DB:", celebrities);
      res.render("celebrities/celebrities.hbs", { celebrities });
    })
    .catch((error) => {
      console.log("Error while getting the celebrities from the DB: ", error);
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

///////////////////////////////////////////////////////////////////////////
// GET route - Create new celebrity (form)

router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"));

///////////////////////////////////////////////////////////////////////////

// POST route to save a new celebrity to the database
router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchphrase } = req.body;

  Celebrity.create({ name, occupation, catchphrase })
    .then(() => res.redirect("/celebrities"))
    .catch((error) => next(error));
});

module.exports = router;
