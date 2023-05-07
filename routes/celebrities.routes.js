const Celebs = require("../models/Celebrity.model");

const router = require("express").Router();


router.get('/celebrities', (req, res, next) => {
    Celebs
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
});


router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
});


router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase, image } = req.body

    Celebs

        .create({ name, occupation, catchPhrase, image })
        .then(newCeleb => res.redirect('/celebrities'))
        .catch(err => console.log(err))
});

router.get('/celebrities/:id/edit', (req, res, next) => {
    const { id } = req.params

    Celebs
        .findById(id)
        .then(celebrities => res.render("celebrities/edit-celebrities", celebrities))
        .catch(err => console.log(err))

});

router.post('/celebrities/:id/edit', (req, res, next) => {
    const { name, occupation, catchPhrase, image } = req.body
    const { id } = req.params

    Celebs
        .findByIdAndUpdate(id, { name, occupation, catchPhrase, image })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
});

router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params

    Celebs
        .findByIdAndDelete(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
});

module.exports = router;