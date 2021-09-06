// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model");

//HOME CELEBRITY
router.get("/", (req, res) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/list-celebrities", { celebrities });
    })
    .catch((err) => console.log(err));
});

//RENDERIZADO FORM
router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});

//CREACION CELEBRITY
router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => console.log(err));
});

module.exports = router;
