const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')


router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})


// Create Celebrity Get


router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

// Create Celebrity Post


router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrity => res.redirect(`/celebrities/celebrities`))
        .catch(err => res.redirect(`/new-celebrity`))
})


// // Celebrity Detail


// router.get('/:celebrity_id', (req, res) => {

//     const { celebrity_id } = req.params

//     Celebrity
//         .findById(celebrity_id)
//         // .populate('cast')
//         .then(celebrity => res.render('celebrities/celebrity-details', celebrity))
//         .catch(err => console.log(err))
// })










module.exports = router;