const express = require('express');
const router = express.Router();

const Celebrity = require('../models/Celebrity.model');

// ------------------
// Celeb listing
// ------------------

router.get("/", (req, res, next) => {
          
    Celebrity
      .find()
      .then((celebrities) => res.render('celebrities/celebrities', {celebrities}))
      .catch(err => console.log(err))
    
    });

// ------------------
// Celeb Creating
// ------------------

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");

})

router.post("/create", (req, res, next) => {
    const { name, occupation, catchPhrase} = req.body;
    
    Celebrity
        .create({name, occupation, catchPhrase})
        .then (() => res.redirect("/celebrities"))
        .catch(err => res.redirect("celebrities/new-celebrity"))

})

// ------------------
// Celeb BONUS
// ------------------


router.get('/:id', (req, res, next) => {

    const { id } = req.params
    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render("celebrities/celebrity-details", celebrity)
        })
        .catch(err => console.log(err))


})

router.post('/:id/delete', (req, res, next) => {

    const { id } = req.params

    Celebrity
        .findByIdAndRemove(id)
        .then(celebrity => {
            res.redirect("/celebrities")
        })
        .catch(err => console.log(err))

})

router.get('/:id/edit', (req, res, next) => {

    const { id } = req.params

    Celebrity
        .findById(id)
        .then(celebrity => {
            res.render('celebrities/edit-celebrity', celebrity)
        })
        .catch(err => console.log(err))



})

router.post('/:id/edit', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body
    const { id } = req.params

    Celebrity
        .findByIdAndUpdate(id, { name, occupation, catchPhrase })
        .then(() => {
            res.redirect("/celebrities")
        })
        .catch(err => {
            res.redirect(`/celebrities/${id}`)
            console.log(err)
        })
})





  module.exports = router;