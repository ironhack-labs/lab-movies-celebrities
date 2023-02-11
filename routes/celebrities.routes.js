const express = require('express');
const router = express.Router();
const Celebrity = require("../models/Celebrity.model")
require("../db")

router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render("celebrities/celebrities", { celebrities }))
        .catch(err => console.log("Se ha producido un error obteniendo las celebridades, error:", err))
});
router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")

});
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect("/celebrities"))
        .catch(() => res.render("celebrities/create"))
})
router.get('/celebrities/:id', (req, res) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => res.render("celebrities/celebrity-details", celebrity))
        .catch(() => res.redirect("/celebrities"))

})
router.get('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => res.render("celebrities/edit-celebrity", celebrity))
        .catch(() => res.redirect("/celebrities"))

})
router.post('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => res.redirect("/celebrities"))
        .catch(() => res.render("celebrities/edit-celebrity"))

})
router.post("/celebrities/:id/delete", (req, res) => {
    const { id } = req.params
    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect("/celebrities"))
        .catch(err => console.error(err))
})
module.exports = router;