const { render } = require("../app");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
//------------------------------------------- CREATE CELEBRITIES ROUTES
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});
router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  let errors = [];

  const newCelebrity = new Celebrity({
    name,
    occupation,
    catchPhrase,
  });

  //CHECK FOR ERRORS
  if (!name || !occupation || !catchPhrase) {
    errors.push({ msg: "All fields are required" });
  }

  //HANDLE ROUTE
  if (errors.length > 0) {
    res.render("celebrities/new-celebrity", {
      errors,
      name,
      occupation,
      catchPhrase,
    });
  } else {
    newCelebrity
      .save()
      .then((celebrity) => {
        console.log(celebrity);
        res.redirect("/celebrities/celebrities");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/celebrities/create");
      });
  }
});

//------------------------------------------- DISPLAY CELEBRITIES ROUTE

router.get("/celebrities", (req, res) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
