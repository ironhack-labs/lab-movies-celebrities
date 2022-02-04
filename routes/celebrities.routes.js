// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require('express').Router();

const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
  });

router.post('/create', (req, res, next) => {
    Celebrity.create(req.body)
        .then((celebrities)=> res.redirect('/celebrities'))
        .catch(()=> res.render('celebrities/new-celebrity'))
});

router.get('/', (req, res, next) => {
    //const celebrities = req.query
    Celebrity.find()
        .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch((e) => next(e))
})

router.post('/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch((e) => next(e))
})

module.exports = router;