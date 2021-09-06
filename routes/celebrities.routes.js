// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here

router.get(
    '/create',
    (req,res) => {
        res.render('new-celebrity');
    }
)
router.post('/create', (req,res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity.create({ name, occupation, catchPhrase })
    .then(() => {
        res.redirect('/celebrities')
    }).catch(() => {
        res.render('new-celebrity')
    });
})

router.get('/', (req,res) => {
    Celebrity.find()
    .then(celeb => res.render('celebrities', {celeb}))
    .catch(err => console.log(err))
})

module.exports = router;