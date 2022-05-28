
const router = require("express").Router()

const Celebrity = require('./../models/Celebrity.model')



// ---------> CELEBRITIES CREATION <---------
router.get('/create', (req, res) => {

    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, chatchPhrase } = req.body

    Celebrity
        .create(req.body)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})



// ---------> CELEBRITIES READING <---------
router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(allCelebrities => {
            res.render('celebrities/celebrities', { allCelebrities })
        })
        .catch(err => console.log(err))
})

module.exports = router