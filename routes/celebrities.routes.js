// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model');

//it.3 ------>
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity'))
});

//it.4 ------>

router.get("/", (req, res) => {

    Celebrity
        .find()
        .then(celebrities => res.render("celebrities/celebrities", { celebrities }))
        .catch(err => console.log("ERROR", err))
})

module.exports = router;