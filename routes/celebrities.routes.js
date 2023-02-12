
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')


router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => res.render('/celebrities/new-celebrity'))
})


router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log('err'))
})

router.post('/:celebrity_id/delete', (req, res) => {

    const { celebrity_id } = req.params
    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

module.exports = router;