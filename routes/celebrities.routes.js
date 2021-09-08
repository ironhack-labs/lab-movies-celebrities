// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

//Middleware
function isLoggedIn(req, res, next) {
  if (req.session.currentUser) next();
  // next invocation tells Express that the middleware has done all it work
  else res.redirect("/auth/login");
}

// all your routes here

router.get("/new-celebrity", isLoggedIn, (req, res) => {
  res.render("celebrities/new-celebrity");
});

router.post("/new-celebrity", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((newCeleb) => res.redirect("/celebrities"))
    .catch((err) => res.redirect("/celebrities/new-celebrity"));
});

router.get("/", (req, res) => {
  Celebrity.find()
    .then((celebs) => {
      console.log(celebs);
      res.render("celebrities/celebrities", { celebs });
    })
    .catch((err) => console.log(err));
});

//Export
module.exports = router;
