const express = require("express");
const router = express.Router();

const Celebrity = require('./../models/Celebrity.model')
const Movie = require('../models/Movie.model')

// Create celebrity
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))
});

router.get("/celebrities", (req, res, next) => {

    Celebrity
        .find()
        .then(allCelebrities => {
            res.render('celebrities/celebrities', { celebrities: allCelebrities })
        })
        .catch(err => console.log(err))

});

//Celebrities details.
router.get('/celebrities/:id', (req, res) => {

    const { id } = req.params
    Celebrity
        .findById(id)
        .then(movie => {
            res.render('celebrities/celebrity-details', movie)
        })
        .catch(err => console.log(err))

});

//editar celebrity (render)

router.get('/celebrities/:id/edit', (req, res) => {
    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => { res.render('celebrities/edit-celebrity', celebrity) })
        .catch(err => console.log(err))
})


//editar Celebrity (hanler)

router.post('/celebrities/:id/edit', (req, res) => {
    const { name, occupation, catchPhrase } = req.body
    const { id } = req.params


    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => { res.redirect(`/celebrities`) })
        .catch(err => console.log(err))

})

//delete 

router.post('/celebrities/:id/delete', (req, res, next) => {
    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => { res.redirect('/celebrities') })
        .catch(err => console.log(err))
});




module.exports = router;