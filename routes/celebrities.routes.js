const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity')
})


router.post('/celebrities/create', (req, res) => {




    const { name, occupation, catchPhrase } = req.body

    //¿POR QUÉ NO ME LLEGA CATCHPHRASE A LA BASE DE DATOS????? (ver comment abajo)


    //DESPUÉS DE REVISAR TEMA CATCHPHRASE, HAGO PRUEBA CREANDO UN NUEVO CELEBRITY Y UNA MOVIE ASOCIADA 
    //AL MISMO Y SI QUE ME APARECE EN MOVIE DETAILS EL CATCHPHRASE DE ESA CELEBRITY, TODO OK AHORA
    
    Celebrity

        .create({ name, occupation, catchPhrase })
        .then(() => res.redirect('celebrities'))
        .catch(err => (console.log(err), res.redirect('celebrities/new-celebrity')))
})




router.get('/celebrities', (req, res) => {



    Celebrity

        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))




})


// all your routes here

module.exports = router;