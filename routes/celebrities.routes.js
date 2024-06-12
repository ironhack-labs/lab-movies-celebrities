const router = require("express").Router()
const celebrity = requiere('./../models/celebrity.model')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')

})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/', (req, res) => {
    celebrity
        .find()
        .then(celebritiesFromDb => res.render('celebrities/celebrities', celebritiesFromDb))
        .catch(err => console.log(err))
})






module.exports = router