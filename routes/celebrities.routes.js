const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

// new celebrity form (render)
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
});

// new celebrity form (handler)
router.post("/celebrities/create", (req, res, next) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect("/celebrities"))
        .catch(err => {
            next(err)
            if (err) res.render("celebrities/new-celebrity")
        })

})

router.get('/celebrities', (req, res, next) => {
    Celebrity
        .find()
        .then(allCelebrities => res.render('celebrities/celebrities', { allCelebrities }))
        .catch(err => console.log(err))
})


module.exports = router;