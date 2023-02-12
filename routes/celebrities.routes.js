// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

router.get('/', (req, res, next) => {
    Celebrity
        .find()
        .then(data => {
            res.render('celebrities/celebrities', { data })
        })
        .catch(err => console.log(err))
})

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')

});

router.post('/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            console.log(err)
            res.render('error')
        })
})

router.get('/:id/edit', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/edit-celebrity', { celebrity })
        })
        .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res, next) => {
    const { name, occupation, catchPhrase, celebrity_id } = req.body

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.post('/:id/delete', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findByIdAndRemove(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))

})

router.get('/:id', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/celebrity-details.hbs', celebrity)

        })
        .catch(err => console.log(err))
})

module.exports = router;