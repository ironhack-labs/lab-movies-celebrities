// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const express = require("express")
const router = express.Router();
const Celebrity = require('../models/Celebrity.model');
// all your routes here
router.get('/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
})
router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect("/celebrities")
            // res.send('es algo')
        })
        .catch(err => console.log(err))
})
router.get('/', (req, res, next) => {
    // res.send("pene")
    Celebrity
        .find()
        .then(celebrities => { res.render("celebrities/celebrities", { celebrities }) })
        .catch(err => console.log(err))

})
module.exports = router;