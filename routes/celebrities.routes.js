
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model'); // Conecto el modelo


router.get("/", (req, res, next) => res.render("index")) // ruta inicial


router.get('/create', (req, res, next) =>{ // ruta de la view del formulario de celebrities para crear.
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => { // pasar datos del formulario a la BD
    const { name, occupation, catchPhrase } = req.body;

    Celebrity
        .create(req.body)
        .then(() => res.redirect('/celebrities'))
        .catch(() => res.render('celebrities/new-celebrity', {errorMessage: 'It does not work, try again'}))
})

router.get("/celebrities", (req, res, next) => { 
  Celebrity
    .find()
    .then(celebrities => res.render('celebrities/celebrities', {celebrities}))
    .catch(err => console.error(err))
});


module.exports = router;