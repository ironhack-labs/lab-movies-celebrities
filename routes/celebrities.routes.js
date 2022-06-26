const router = require("express").Router();
const { render } = require("../app");
const CelebrityModel = require("../models/Celebrity.model");
//const celebrity = require('../models/Celebrity.model')


router.get('/celebrities/create', (req, res) => {

    //rest.send("Holiiiiii")

    res.render('celebrities/new-celebrity')

})


router.post('/celebrities/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body //objeto que recoge la información
    console.log(req.body)

    CelebrityModel

        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('/celebrities'))
        .catch(error => next(error));

})

router.get('/celebrities', (req, res) => {

    //res.render('celebrities/celebrities')

    CelebrityModel
        .find()
        .then((celebrities) => { //Celebrities es lo que recoge el find de la base de datos y se lo pasamos al res.render como parámetro en un objeto para que nos lo imprima
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch(err => console.log(err))
});



















module.exports = router;