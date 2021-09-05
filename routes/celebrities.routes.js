// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model');

router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', {celebrities});
        })
        .catch(err => console.error(err))
    
})

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
    
    Celebrity
    .create(req.body)
    .then(() => res.redirect('/celebrities'))
    .catch(() => res.render('celebrities/new-celebrity', {errorMessage: 'No se ha podido crear'}))
})

router.get('/:celebrityId', (req, res) => {
    Celebrity
    .findById(req.params.celebrityId)
    .then(celebrity => res.render('celebrities/celebrity-details', celebrity))
    .catch(err => console.error(err));
})

router.post('/:celebrityId/delete', (req, res) => {
    Celebrity
    .findByIdAndRemove(req.params.celebrityId)
    .then(() => res.redirect('/celebrities'))
    .catch(err => console.error(err));
});

router.get('/:celebrityId/edit', (req, res) => {
    Celebrity
    .findById(req.params.celebrityId)
    .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
    .catch(err => console.error(err));
});

router.post('/:celebrityId/edit', (req, res) => {
    Celebrity
    .findByIdAndUpdate(req.params.celebrityId, req.body)
    .then(() => res.redirect('/celebrities/'+req.params.celebrityId))
    .catch(err => console.error(err));
});

module.exports = router;
