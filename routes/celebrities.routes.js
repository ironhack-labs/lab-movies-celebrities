// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

// all your routes here

router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities.hbs', { celebrities }))
        .catch(err => console.log(err))

})


router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity.hbs')


})

router.post('/create', (req, res) => {
    // console.log('funcionoooooo')
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))

})



router.get('/delete/:id', (req, res) => {
    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})








module.exports = router;