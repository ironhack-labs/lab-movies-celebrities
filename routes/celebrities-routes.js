const router = require("express").Router()
const Celebrity = require("./../models/Celebrity.model")
const Movie = require('./../models/Movie.model')






router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhare } = req.body


    Celebrity
        .create({ name, occupation, catchPhare })
        .then(() => {
            res.redirect('/celebrities')
        })

        .catch(err => {
            console.log(err)
            res.render('celebrities/new-celebrity')
        })

})

router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })

        .catch(err => console.log(err))


})



module.exports = router