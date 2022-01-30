// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
  });

router.post('/celebrities/create', (req, res, next) => {
    Celebrity.create(req.body)
        .then((celebrities)=> res.redirect('/celebrities'))
        .catch(()=> res.render('celebrities/new-celebrity'))
});

router.get('/celebrities', (req, res, next) => {
    //const celebrities = req.query
    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch((e) => next(e))
})

module.exports = router;