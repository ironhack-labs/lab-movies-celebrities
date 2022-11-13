// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// require celebrity model
const Celebrity = require('./../models/Celebrity.model');

//Celebrities creation

router.get('/celebrities/create', (req, res) => {

    //render celebrities new celebrities view

    res.render('celebrities/new-celebrity')

});

router.post('/celebrities/create', (req, res) => {

    //key - value pairs of data submitted in the request body
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => {
            console.log(err)
        })

})

//Celebrities list

router.get('/celebrities', (req, res) => {

    //render celebrities
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
});








module.exports = router;