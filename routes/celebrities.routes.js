const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

// all your routes here


router.get('/celebrities/create', (req, res) => {

    res.render('./celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(newCelebrity => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})


router.get("/celebrities", (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities => {
            res.render("./celebrities/celebrities", { celebrities })
        })
        .catch(err => console.log(err))

});





module.exports = router;