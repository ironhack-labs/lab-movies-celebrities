// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// all your routes here
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.redirect('/create'))

})

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrity => res.render("celebrities/celebrities", { celebrity }))
        .catch(err => console.log(err))
})


module.exports = router;