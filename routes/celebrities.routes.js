const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')



router.get('/celebrities/create', (req, res) => {
    res.render('./../views/views-celebrities/new-celebrities')
})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body
    if (name.length === 0 || occupation.length === 0 || catchPhrase.length === 0) {
        res.render('./../views/views-celebrities/new-celebrities')
        return
    }

    Celebrity

        .create({ name, occupation, catchPhrase })
        .then(celebrities => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})


router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('./../views/views-celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})



module.exports = router;