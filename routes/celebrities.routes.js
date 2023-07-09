// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const id = req.params.id

    Celebrity.create(req.body)
    .then(() => {
        res.redirect('celebrities/celebrities')
    })
    .catch((err) => {
        console.error(err)
        res.render('celebrities/new-celebrity')
    })

})

module.exports = router;