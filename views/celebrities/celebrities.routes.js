

const router = require("express").Router();

// const { findOne } = require("../models/Celebrity.model");
const Celebrity = require("../models/Celebrity.model");
// all your routes here


// Celebrities list
router.get('/', (req, res, next) => {

    Celebrity
        .find()
        //.select('name')
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})

router.get('/registrar', (req, res) => res.render('celebrities/new-celebrity'))

router.post('/registrar', (req, res) => {

    const { name, ocupation, catchPhrase, image } = req.body

    Celebrity

        .findOne({ name })
        .then(user => {

            // if (user) {
            //     res.render('celebrities/new-celebrity', { errorMessage: 'Celebridad  ya registrada' })
            //     return
            // }
            Celebrity
                .create({ name, ocupation, catchPhrase, image })
                .then(() => res.redirect('/celebridades'))

        })

        .catch(err => console.log(err))
})

router.get('/detalles/:celebrity_id', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        // .populate('celebrity.model')
        .then(celebrities => res.render('celebrities/celebrity-details', celebrities))
        .catch(err => console.log(err))
})

router.get('/:celebrity_id/editar', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then(celebrities => res.render('celebrities/edit-movie', celebrities))

        .catch(err => console.log(err))


})


router.post('/:celebrity_id/editar', (req, res) => {

    const { celebrity_id } = req.params
    const { name, ocupation, catchPhrase, image } = req.body

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, ocupation, catchPhrase, image })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
})

router.get('/borrar/:celebrity_id', (req, res) => {

    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndRemove(celebrity_id)
        // .populate('celebrity.model')
        .then(movies => res.render('celebrities/celebrities', movies))
        .catch(err => console.log(err))
})



module.exports = router;