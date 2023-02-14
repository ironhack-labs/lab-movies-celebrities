// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here

//Iteration 3

router.get('/celebrities/create', (req, res, next) => res.render('celebrities/new-celebrity'))

router.post('/celebrities/create', async (req, res, next) => {
    try {
        await Celebrity.create(req.body)
        res.redirect('/celebrities')
    } catch (error) {
        console.log(error)
        res.render('celebrities/new-celebrity')
    }
})

// Iteration 4
router.get('/celebrities', async (req, res, next) => {
try {
    let allCelebs = await Celebrity.find()
    res.render('celebrities/celebrities', {allCelebs})
} catch (error) {
    console.log(error)
}
})

module.exports = router;