const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model');


// Create celebrity

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    
    const { name, occupation, catchPhrase } = req.body
  
    if (name.length === 0 || occupation.length === 0 || catchPhrase.length === 0) {
        res.render('celebrities/new-celebrity', { name, occupation, catchPhrase, 
                    errorMsg: 'All fields must be completed' })
        return
    }

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})


// Celebrities main page

router.get('/', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})


// Delete celebrity

router.post('/:id/delete', (req, res) => {

    const { id } = req.params

    Celebrity
        .findByIdAndRemove(id)
        .then(res.redirect('/celebrities'))
        .catch(err => console.log(err))
})


// Celebrity details

router.get('/:id', (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => res.render('celebrities/celebrity-details', { celebrity }))
        .catch(err => console.log(err))
})


// Edit celebrity

router.get('/:id/edit', (req, res) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => {
            console.log(celebrity)
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => console.log(err))
})

router.post('/:id', (req, res) => {

    const { id } = req.params
    const { name, occupation, catchPhrase } = req.body

    if (name.length === 0 || occupation.length === 0 || catchPhrase.length === 0) {
        res.render('celebrities/edit-celebrity', {id, name, occupation, catchPhrase, 
                    errorMsg: 'All fields must be completed'})
        return
    }

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase }, { new: true })
        .then(res.redirect(`/celebrities/${id}`))
        .catch(err => console.log(err))
})


module.exports = router;
