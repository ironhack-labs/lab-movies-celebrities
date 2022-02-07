const router = require("express").Router()
const Celebrity = require('../models/Celebrity.model')


// routes go here
router.get('/', (req, res) => {
    Celebrity
        .find()
        .select('name')
        .then(allCelebs => res.render('celebrities/celebrities', { allCelebs }))
        .catch(err => console.log(err))
})



router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity'))
})


module.exports = router