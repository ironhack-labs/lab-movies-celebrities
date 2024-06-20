// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

// Renderizado del formulario
router.get('/celebrities/create', (req, res) => {

    res.render("celebrities/new-celebrity")

});

// Creacion de la Celebrity

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(celebrities => res.redirect("/celebrities"))
        .catch(err => res.redirect("/celebrities"))
});

// Listado de las Celebrities
router.get('/celebrities', (req, res) => {


    Celebrity
    .find()
    .then(celebrities => res.render("celebrities/celebrities", {celebrities})) 
    .catch(err => console.log(err))


});







module.exports = router;
