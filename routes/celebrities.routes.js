// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity-model')

// all your routes here
router.get('/celebrities/create', (req, res) => { res.render('celebrities/new-celebrity') });


router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => {
            res.redirect(`/`)
        })
        .catch(err => console.log(err))

});

router.get('/celebrities/celebrities', (req, res) => {

    Celebrity
        .find()
        .select()
        .then(celebrities => {
            console.log(celebrities)
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))

});



module.exports = router;