const express = require("express");
const router = express.Router();
const Celebrity = require("./../models/Celebrity.model");

// llamada para obtener la vista del formulario 
router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
})
//llamada para crear actores para poner en la BBDD
router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    Celebrity
    .create(req.body)
    .then(() => {
        res.redirect('/celebrities')
    })
    .catch((err) => {
        console.log('error creating new celebrities' + err)
    })
})
//llamada para obtener "actores"/datos de la BBDD
router.get('/', (req, res, next) => {
    Celebrity
        .find()
        .then(celebrities =>
            res.render('celebrities/celebrities', { celebrities })
        );
});
module.exports = router;
