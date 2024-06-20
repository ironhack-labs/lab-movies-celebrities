// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();


const Celebrity = require('../models/Celebrity.model')


router.get('/', (req, res, next) => {
    console.log('estoy en celebritiers')
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
})
router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')

})
router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    console.log(req.body)
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {

            res.redirect(`/celebrities`)
        })
        .catch(err => console.log(err))
});
router.get('/celebrity-details/:celebrity_id', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => {
            res.render('celebrities/celebrity-details', celebrity)
        })
        .catch(err => console.log(err))
})

router.post('/:celebrity_id/delete', (req, res, next) => {
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(() => res.redirect(''))
        .catch(err => console.log(err))
});

router.get('/:celebrity_id/edit', (req, res, next) => {
    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrity => {
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => console.log(err))
});

router.post('/:celebrity_id/edit', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(() => res.redirect(`/celebrities`))
        .catch(err => console.log(err))
});







module.exports = router;