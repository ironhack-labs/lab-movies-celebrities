// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')

// all your routes here

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.get('/celebrities', async (req, res) => {
    const celebrityList = await CelebrityModel.find()
    res.render('celebrities/celebrities', { celebrityList })
})

router.post('/celebrities/create', async (req, res) => {
    try {
        const newCelebrity = await CelebrityModel.create(req.body)
        res.redirect('/celebrities')
        console.log("new celebrity created", newCelebrity)
    } catch (error) {
        res.render('celebrities/new-celebrity')
        console.log(error)
    }
})
module.exports = router;