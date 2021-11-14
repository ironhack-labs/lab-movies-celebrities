// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get('/celebrities/create', (req, res) => res.render("celebrities/new-celebrity"))

router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase, image } = req.body;
    Celebrity
        .create({ name, occupation, catchPhrase, image })
        .then(() => res.redirect("/celebrities"))
        .catch(() => res.render("celebrities/new-celebrity"))

})

router.get('/celebrities', (req, res) => {
    Celebrity
        .find()
        .then(celebrityArray => res.render("celebrities/celebrities", { celebrities: celebrityArray }))
        .catch(error => console.error('Error connecting to the database', error));
})



module.exports = router;
