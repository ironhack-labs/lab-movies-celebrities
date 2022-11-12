// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')


// all your routes here
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchphrase } = req.body

    Celebrity
        .create({ name, occupation, catchphrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))

});
router.get('/celebrities', (req, res) => {
    Celebrity
        .find()
        .then((celebrity) => {
            res.render('celebrities/celebrities', { celebrity })
        })
        .catch(err => console.log(err))

})

module.exports = router;