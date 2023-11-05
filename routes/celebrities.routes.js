const router = require("express").Router()
module.exports = router;
const Celebrity = require('./../models/Celebrity.model')
const Movie = require('./../models/Movie.model')



router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))



})

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/celebrities`))
        .catch(err => console.log(err))

})

router.get('/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params
    Celebrity
        .findById(celebrity_id)
        .then(celebrity => res.render('celebrities/edit-celebrity', celebrity))
        .catch(err => console.log(err))

})

router.post('/:celebrity_id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { celebrity_id } = req.params
    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/celebrities`))
        .catch(err => console.log(err))

})


router.post('/:celebrity_id/delete', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndDelete(celebrity_id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

// {
//     name: String,
//         occupation: String,
//             catchPhrase: String
// }
