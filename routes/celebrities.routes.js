// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
})

// -------------------------------------> Ni idea de por donde seguir

    