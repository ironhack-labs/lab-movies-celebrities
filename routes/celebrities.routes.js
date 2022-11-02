// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const { response } = require("../app");
const celebrity = require("../models/Celebrity.model");
// all your routes here
router.get('/create', (req, res) => {
    console.log("inside")
    res.render('celebrities/new-celebrity')
})
router.post('/create', async (req, res) => {
    try {
        const newCelebrity = await celebrity.create(req.body)
        console.log("new celeb created to the db")
        res.redirect('/celebrities')
    } catch (err) {
        res.render('celebrities/new-celebrity')
        console.log("error creating new celeb")
    }
})
 router.get('/', async (req, res) => {
    try{
        const celeb =  await celebrity.find()
        res.render('celebrities/celebrities', {celeb})
    } catch (err){
        console.log(err)
    }
 });
module.exports = router;