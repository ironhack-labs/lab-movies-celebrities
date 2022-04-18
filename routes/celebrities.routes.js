const router = require("express").Router()

const Celebrity = require('./../models/celebrity.model')

router.get('/create', (req, res) => {

    res.render('celebrities/new-celebrity')
})

router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => res.redirect('celebrities/new-celebrity'))
})

router.post('/create', (req, res) => {

    const { name, ocupation, catchPhrase } = req.body

    Celebrity
        .create({ name, ocupation, catchPhrase })
        .then(newCelebrity => {
            res.redirect(`/celebrities`)
        })
        .catch(err => res.redirect('celebrities/new-celebrity'))
})

//----------------------------B O N U S --------------------------------------

router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => {
            //res.send("funcionaaaa")
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => res.redirect('celebrities/new-celebrity'))

})

router.post('/:id', (req, res) => {

    const { id } = req.params
    const { name, ocupation, catchPhrase, } = req.body

    Celebrity
        .findByIdAndUpdate(id, { name, ocupation, catchPhrase })
        .then(celebrity => {
            res.redirect(`/celebrities`)
        })
})

router.post('/:id/delete', (req, res, next) => {

    const { id } = req.params

    Celebrity
        .findByIdAndRemove(id)
        .then(() => {
            res.redirect(`/celebrities`)
        })
        .catch(err => console.log(err))
});


module.exports = router

