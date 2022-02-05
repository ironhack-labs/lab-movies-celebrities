const router = require("express").Router();
const { redirect } = require("express/lib/response");
// const app = require('../app')

const Celebrity = require('../models/Celebrity.model')

// Routes:


// Create a celebrity

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})
router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            res.render('celebrities/new-celebrity')
            console.log(err)
        })
})

// List the celebrities

router.get('/', (req, res, next) => {

    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))

})







module.exports = router