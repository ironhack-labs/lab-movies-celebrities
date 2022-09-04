// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const CelebrityModel = require('../models/Celebrity.model')

// all your routes here
router.get('/', (req, res, next) => {
    CelebrityModel.find()
        .select('name occupation catchPhrase')
        .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch((err) => next(err))

})

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})


router.get('/:id', (req, res, next) => {
    CelebrityModel.findById(req.params.id)
        .then((celebrity) => {
            const { name, occupation, catchPhrase } = celebrity
            res.render('celebrities/celebrity-details', { name, occupation, catchPhrase })
        })
        .catch()
})

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    CelebrityModel.create({ name, occupation, catchPhrase })
        .then(() => {
            console.log("New celebrity created")
            res.redirect('/celebrities')
        })
        .catch((err) => {
            console.log('Error: ', err)
            res.redirect('/celebrities/create')
        })
})

module.exports = router