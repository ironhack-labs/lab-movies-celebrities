const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity"); // una vista sin barra primero
});

router.post("/create", (req, res, next) => {
  // una ruta con barra
  const { body } = req;
  Celebrity.create(body)
    .then(() => {
      res.redirect("/celebrities");
    })
    .catch(error => {
      console.error(error);
      res.render("celebrities/new-celebrity");
    });
});

router.get("/", (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch(error => console.error(error));
});

module.exports = router;
