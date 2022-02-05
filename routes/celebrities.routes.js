const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// RUTA A CREAR CELEBRIDADES (GET)
router.get("/crear", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});

// RUTA A CREAR CELEBRIDADES (POST)
router.post("/crear", (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect("/celebridades"))
        .catch(err => res.render("celebrities/new-celebrity"))
});

//RUTA A  LISTAR CELEBRIDADES
router.get("/", (req, res, next) => {

    Celebrity
        .find()
        .then((celebrity => res.render("celebrities/celebrities", {celebrity})))
        .catch(err=> console.log(err))
});

module.exports = router