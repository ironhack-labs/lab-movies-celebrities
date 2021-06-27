// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model") //concecto la ruta con el modelo
//codigo
// router.get("/", (req, res) => {
//     res.render("celebrities/celebrities") //conecto la ruta con hbs(celebrities/celebrities)
// })

//ruta crear celebridades

router.get('/create', (req, res, next) => {  //conecto con new-celebrity.hbs
    res.render('celebrities/new-celebrity'); //paso 3 iteracion 3
})

router.post('/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity // paso 4 iteracion 3
        .create(req.body)
        .then(() => res.redirect('/celebrities')) // redirigimos al listado de celebridades
        .catch(() => res.render('celebrities/new-celebrity',
            { errorMessage: 'no se puede crear celebridad' }))
})


//iteracion 4
router.get('/', (req, res) => {
    Celebrity
        .find()
        .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
        .catch(err => console.log(err))
})



module.exports = router



