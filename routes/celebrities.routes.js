// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')


// all your routes here

router.get('/celebrities/create',(req, res, next) => res.render('celebrities/new-celebrity'));
//router.post('/celebrities/create', async (req, res, next) => try {
//  const newCelebrity = CelebrityModel.create(req.body)
//res.render('celebrities/new-celebrity'));

router.get('/celebrities', async (req, res) => {
    const celebrityList = await Celebrity.find()
    res.render('celebrities/celebrities', { celebrityList })
})

router.post('/celebrities/create', async (req, res) => {
    try {
        const newCelebrity = await Celebrity.create(req.body)
        res.redirect('/celebrities')
        console.log("new celebrity created", newCelebrity)
    } catch (error) {
        res.render('celebrities/new-celebrity')
        console.log(error)
    }
})
module.exports = router;

