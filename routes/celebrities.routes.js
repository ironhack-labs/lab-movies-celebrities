const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')

// all your routes here

// READ CELEBS
router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .sort({ name: 1 })
        .then(celebFromDB => {
            res.render("celebrities/celebrities", { celebFromDB })
        })
        .catch(err => console.log(err))



})

// CREATE CELEBS
router.get('/celebrities/create', (req, res, next) => {

    res.render("celebrities/new-celebrity")

})
router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(newCeleb => res.redirect('/celebrities'))
        .catch(err => {
            // alert('TRY AGAIN')
            res.redirect('/celebrities/create')
        })

});

// DELETE CELEB
router.post('/celebrities/:id/delete', (req, res, next) => {

    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect("/celebrities"))
        .catch(err => console.log(err))
});


module.exports = router;