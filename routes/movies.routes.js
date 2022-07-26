const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")
//const Movies = require("../models/movies.routers.js")
//movies

    router.get("/movies/create", (req, res, next) => {
        Celebrities.find()
        .then((celebridades) => {
            res.render("celebrities/new-movie", { celebridades})
        })
        .catch(console.log)
    })


    router.get("/movies", (req, res, next) => {
        res.render("/routes/movies.routes")
    })


    router.get("/celebrities/create", (req, res) => {
        res.render('celebrities/new-celebrity')
    })

    router.post('/celebrities/create', (req, res) => {
    const {name, occupation, catchPhrase} = req.body
    Celebrity
        .create({name, occupation, catchPhrase})
        .then(celebrity => res.redirect('/celebrities'))
        .catch(err => res.redirect('/celebrities/redirect'))
    })

    router.get('/celebrities', (req, res) => {
        Celebrity
        .find()
        .then(celebrity => res.render('celebrities/celebrities', {celebrity}))
        .catch(err => console.log(err))
    })

    module.exports = router;
