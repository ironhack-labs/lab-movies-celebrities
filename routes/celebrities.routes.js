// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');
// all your routes here
// GET route to display the form to create new celebrity
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity.hbs')
})

//POST route to get the info of the new celebrity from form and save in DB
router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
        .then(celebrityFromDB => {
            console.log(`New celebrity created: ${celebrityFromDB}.`)
            res.redirect("/celebrities")
        })
        .catch(err => {
            console.log(err);
            res.render("celebrities/new-celebrity");
        })
})

//Get route to list all celebrities on /celebrities
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(celebritiesFromDB => {
            res.render("celebrities/celebrities.hbs", {celebritiesFromDB})
        })
        .catch(err => {
            console.log('Error listing celebrities: ', err)
            next(err)
        })
})

//Get route to see celebrity details
router.get('/celebrities/:id', (req, res, next)=> {
    const {id} = req.params;
    Celebrity.findById(id)
        .then(celebrity => {
            res.render('celebrities/celebrity-details', {celebrity})
        })
        .catch(err => {
            next(err)
        })
})

//Get route to update celebrity
router.get('/celebrities/:id/edit', (req, res, next) => {
    const {id} = req.params;
    Celebrity.findById(id)
        .then(celebrityToUpdate => {
            console.log('celebrityToUpdate: ', celebrityToUpdate)
            res.render('celebrities/edit-celebrity.hbs', {celebrityToUpdate})
        })
        .catch(err => {
            next(err)
        })
})

//Post route to update celebrity

router.post('/celebrities/:id/edit', (req, res, next) => {
    const {id} = req.params;
    const { name, occupation, catchPhrase} = req.body;
    Celebrity.findByIdAndUpdate(id, {name, occupation, catchPhrase}, {new: true})
        .then((updatedCelebrity) => {
            console.log('updated celebrity: ', updatedCelebrity)
            res.redirect(`/celebrities/${updatedCelebrity._id}`)
        })
        .catch(err => next(err))
})

//Delete celebrity

router.post('/celebrities/:id/delete', (req, res, next) => {
    const {id} = req.params;
    Celebrity.findByIdAndRemove(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => {
            console.log('Error deleting a celebrity; ', err)
            next(err)
        })
})

module.exports = router;