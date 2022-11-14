// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrities = require("../models/Celebrity.model");

// all your routes here

router.get("/", (req, res) => {
  Celebrities.find().then((celebrities) => {
    res.render("./celebrities/celebrities", { celebrities: celebrities });
  });
});

//Create new celebrity
router.get("/create", (req, res) => {
  res.render("./celebrities/new-celebrity");
});

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrities.create({ name, occupation, catchPhrase })
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch((err) => {
      res.render("./celebrities/new-celebrity");
    });
});

module.exports = router;
