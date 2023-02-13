// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

const Celebrity = require('../models/Celebrity.model')

router.get('/create', (req, res) => {
    // console.log('hola')
    // res.send('hola')
    res.render('./celebrities/new-celebrity')

})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    console.log(req.body)
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/celebrities', (req, res) => {

    // res.send('name')
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))

})



module.exports = router;