const router = require("express").Router();

const Movie = require('../models/Movie.model');
const Celebrity = require('../models/Celebrity.model');

router.get('/celebrities/create', (req, res) => {

    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(() => {
            res.render('celebrities/new-celebrity')
        })

});

router.get('/celebrities', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(e => res.send('ERRORRRR'))
});


// EDICIÓN DE CELEBRITIES
router.get('/celebrities/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => res.render('celebrities/update-celebrity-form', celebrity))
        .catch(e => console.log(e))
});

router.post('/celebrities/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(res.redirect('/celebrities'))
        .catch(e => console.log(e))
});

// DELETE CELEBRITY
router.post('/celebrities/:celebrity_id/delete', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(res.redirect('/celebrities'))
        .catch(e => console.log(e))
});

module.exports = router;