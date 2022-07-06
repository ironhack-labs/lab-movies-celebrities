// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here//se crean los const
const Movie = require('../models/Movies.model')
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => res.redirect('/celebrities/create'))
})

router.get('/celebrities', (req, res) => {
    Celebrity
        .find()//model to retrieve all the celebrities
        .then(celebrity => res.render('celebrities/celebrities', { celebrity }))//view and pass the array of celebrities into the view as a variable
        .catch(err => console.log(err))
})
module.exports = router;



