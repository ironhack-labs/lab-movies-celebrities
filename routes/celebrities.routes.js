const router = require("express").Router()
//const req = require('express/lib/request')
// require the Drone model here

const Celeb = require("./../models/Celebrity.model")
const Movie = require("./../models/Movie.model")

router.get('/celebrities/create', (req, res) => {

    res.render('celebrities/new-celebrities')

})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body
    Celeb
        .create({ name, occupation, catchPhrase })
        .then(newCeleb => {
            res.redirect('/celebrities')

        })
        .catch(err => console.log(err))

})


router.get('/celebrities', (req, res) => {

    Celeb
        .find()
        .then(celebs => {


            //res.send({ celebs })
            res.render('celebrities/celebrities', { celebs })

        })
        .catch(err => console.log(err))
})


/////////////////////////


module.exports = router