const router = require('express').Router()
const { redirect } = require('express/lib/response')
const Celebrity = require('../models/Celebrity.model')

router.get("/crear", (req, res) => {
        res.render('celebrities/new-celebrity')
})

router.post("/crear", (req, res) => {
    const { name, ocuppation, catchPhrase } = req.body

    Celebrity
        .create({ name, ocuppation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})







module.exports = router