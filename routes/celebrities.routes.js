const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get('/create', (req, res) => {
    res.render(`celebrities/new-celebrity`)
})

router.post('/create', (req, res) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then(celeb => res.redirect('/celebrities'))
    .catch(err => console.log(err))
})

router.get('/', (req, res) => {
    Celebrity.find()
    .then(celebs => {
        res.render('celebrities/celebrities', {celebs}) 
    })
    .catch(err => console.log(err))
})

module.exports = router;