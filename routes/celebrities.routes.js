const Celebrities = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

/* GET home page */
router.get("/", (req, res) => res.render("index"))


// Crear una celebrity
router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"))

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrities
        .findOne({ name })
        .then(user => {

            if (user) {
                res.render('celebrities/new-celebrity', { errorMessage: 'Celebrity already created' })
                return
            }

            Celebrities
                .create({ name, occupation, catchPhrase })
                .then(() => res.redirect('/celebrities'))
                .catch(err => console.log(err))

        })
        .catch(err => console.log(err))
})

// Mostrar celebrities
router.get("/celebrities", (req, res) => {
    Celebrities
        .find()
        .then(celebrities => res.render("celebrities/celebrities", { celebrities }))
        .catch(err => console.log(err))

})





module.exports = router;