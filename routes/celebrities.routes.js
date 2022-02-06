// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
// all your routes here

router.get('/create', (req, res) => {

    res.render('../views/celebrities/new-celebrity')

})

router.post('/create', (req, res) => {
    const { name, occupation, catchphrase } = req.body

    Celebrity
        .create({ name, occupation, catchphrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.redirect('/celebrities/create'))
})

router.get('/', (req, res) => {
    Celebrity.find()
        .then((celebrities) => res.render('../views/celebrities/celebrities', { celebrities: celebrities }))
        .catch(() => console.log(err, "there was an error yo!!!"))
})



module.exports = router;