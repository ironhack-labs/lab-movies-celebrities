const router = require("express").Router();
const req = require("express/lib/request");

const Celebrity = require('./../models/Celebrity.model')

//Crear una celebrity en Express GET/POST

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')

})

router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(newCelebrity => {
            res.redirect('/celebrities')
        })
        .catch(err => {
            res.render('celebrities/new-celebrity')

        })
})

//Hacer que se renderice la lista de Celebs creadas

router.get('/celebrities', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => {
            // console.log(celebrities)
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
})


module.exports = router;