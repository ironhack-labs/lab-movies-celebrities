// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const celebrities = require("../models/Celebrity.model");

// all your routes here

router.get("/create", (req, res) => {
  res.render("celebrities/new-celebrity");
});
router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  if (
    occupation.length === 0 ||
    name.length === 0 ||
    catchPhrase.length === 0
  ) {
    // Si la contraseña está vacía
    res.render("celebrities/new-celebrity", {
      errorMsg: "Rellena los campos",
    });
    return;
  }

  celebrities
    .create({ name, occupation, catchPhrase })

    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(() => res.render("celebrities/new-celebrity"));
});

// enrutado pagina celebrities

router.get("/", (req, res, next) => {
  celebrities

    .find()

    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
