const router = require("express").Router();

//Require model
const Celebrity = require('../models/Celebrity.model');

//Celebrity routes

//GET

router.get('/celebrities/create', (req, res) => {

    res.render("celebrities/new-celebrity");

});

//POST

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity

        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(err => res.redirect('/celebrities/create'))

});

//GET
router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))


});

//Delete

router.post('/celebrities/:id/delete', (req, res, next) => {
    // Iteration #5: Delete the celebrity

    const { id } = req.params

    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect('/celebrities'))
        .catch(err => console.log(err))

});



//Export module
module.exports = router;