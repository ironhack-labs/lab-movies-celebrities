// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(newCelebrity => res.redirect(`/celebrities`))
        .catch(err => console.log(err))
});

router.get("/celebrities", (req, res, next) => {
    let counter = 1;
    Celebrity
        .find()
        .then(celebrities => {
            celebrities.forEach(celebrity => {
                celebrity.counter = counter++;
            });
            console.log('holaaaa', celebrities)
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
});

router.post("/celebrity/:id/delete", (req, res, next) => {
    const { id } = req.params
    Celebrity
        .findByIdAndDelete(id)
        .then(() => res.redirect("/celebrities"))
        .catch(err => console.log(err))
})

module.exports = router;