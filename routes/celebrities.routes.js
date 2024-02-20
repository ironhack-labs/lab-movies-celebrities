const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })

        .catch(err => console.log('An error occurred creating a new celebrity!', err))
})

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log('An error occurred retreiving all celebrities!', err))
})

router.get('/:id/edit', (req, res) => {

    const { id } = req.params
    Celebrity
        .findById(id)
        .then(
            celebrity => {
                res.render('celebrities/edit-celebrity', celebrity)
            }
        )
})

router.post('/:id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { id } = req.params

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log('An error occurred updating the celebrity', err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log('An error occurred deleting the celebrity', err))
})
module.exports = router;