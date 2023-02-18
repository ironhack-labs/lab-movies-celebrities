// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const celebrity = require('../models/Celebrity.model');



// all your routes here
router.get('/', (req, res) => {
    celebrity.find()
        .then(celebrities => res.render('celebrities/celebrities.hbs', { celebrities }))
        .catch(() => res.render('celebrities/celebrities.hbs'))
})



router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity.hbs') 
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    celebrity.create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity.hbs') )
})




module.exports = router;