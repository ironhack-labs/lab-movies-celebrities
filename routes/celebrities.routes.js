// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const req = require("express/lib/request");
const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
    Celebrity.create(req.body)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch(() => {
            res.render('celebrities/new-celebrity');
        })
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities: celebrities })
        })
        .catch((e) => console.log(e));
})

router.get('/celebrities/:id', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((celebrity) => {
            res.render('celebrities/celebrity-details', { celebrity: celebrity })
        })
        .catch((e) => console.log(e));
})

router.get('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findById(req.params.id)
        .then((celebrity) => {
            console.log(celebrity);
            res.render('celebrities/edit-celebrity', { celebrity: celebrity })
        })
        .catch((e) => console.log(e));
})

router.post('/celebrities/:id/edit', (req, res, next) => {
    Celebrity.findByIdAndUpdate(req.params.id, req.body)
        .then(() => {
            res.redirect(`/celebrities/${req.params.id}`)
        })
        .catch((e) => console.log(e))
})

router.post('/celebrities/:id/delete', (req, res, next) => {
    Celebrity.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/celebrities');
        })
        .catch((e) => console.log(e));
})



module.exports = router;