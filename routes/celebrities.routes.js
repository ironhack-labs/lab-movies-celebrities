const express = require("express");
const router = express.Router();

//Requerimos celebrity model
const Celebrity = require("../models/Celebrity.model");


// ruta para renderizar las celebrities creadas
router.get("/", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => console.log(err));
});

// ruta donde creamos las celebrities GET
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity", {});
});


// ruta donde creamos las celebrities POST
router.post("/create", (req, res, next) => {
  Celebrity.create(req.body)
    .then((celebrity) => {
     // console.log(celebrity);
      res.redirect("/celebrities");
    })
    .catch((err) => {
        //si nos da error volvemos a new celebrity
      res.render("celebrities/new-celebrity");
    });
});

router.get("/new-celebrity", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

module.exports = router;