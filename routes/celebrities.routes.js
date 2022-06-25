const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model.js')

router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post("/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect("/create");
        })
        .catch((err) => {
            console.log(err);
            res.redirect("/create");
        });
});

router.get('/celebrities', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
})

module.exports = router