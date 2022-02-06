const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// RUTA A CREAR FAMOSOS (GET)
router.get("/crear", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});

// RUTA A CREAR FAMOSOS(POST)
router.post("/crear", (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect("/celebridades"))
        .catch(err => res.render("celebrities/new-celebrity"))
});

//RUTA A  LISTAR FAMOSOS
router.get("/", (req, res, next) => {

    Celebrity
        .find()
        .then((celebrity => res.render("celebrities/celebrities", { celebrity })))
        .catch(err => console.log(err))
});
//RUTA DETALLE DE FAMOSOS
router.get("/:celeb_id", (req, res, next) => {

    const { celeb_id } = req.params

    Celebrity
        .findById(celeb_id)
        .then(celeb => res.render("celebrities/celebrity-details", celeb))
        .catch(err => console.log(err))
})

//RUTA EDITAR FAMOSO (GET)
router.get("/:celeb_id/editar", (req, res, next) => {

    const { celeb_id } = req.params

    Celebrity
        .findById(celeb_id)
        .then((celebDetails) => res.render("celebrities/edit-celebrity", celebDetails))
        .catch(err => console.log(err))
})
//RUTA EDITAR FAMOSOS (POST)
router.post("/:celeb_id/editar", (req, res, next) => {

    const { celeb_id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(celeb_id, { name, occupation, catchPhrase }, { new: true })
        .then(() => res.redirect("/celebridades"))
        .catch(err => console.log(err))
})


//RUTA BORRAR FAMOSOS
router.post("/:celeb_id/eliminar", (req, res, next) => {

    const { celeb_id } = req.params

    Celebrity
        .findByIdAndDelete(celeb_id)
        .then(() => res.redirect("/celebridades"))
        .catch(err => console.log(err))

})
module.exports = router