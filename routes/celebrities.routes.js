
const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

router.get('/', (req, res) => {

    //res.send('HOLIHOLI')
    Celebrity
        .find()
        .then((celebritiesFromForm) => {
            res.render('celebrities/celebrities', { celebrities: celebritiesFromForm })
        })
        .catch((err) => console.log(err))
})

router.get('/create', (req, res) => {

    //res.send('HOLIHOLI23')
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create(({ name, occupation, catchPhrase }))
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})

// redirect(Le paso como parametro la ruta a la que quiero redirigir al usuario)





module.exports = router;