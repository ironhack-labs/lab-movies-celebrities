
const router = require("express").Router();

const MovieModel = require("../models/Movie.model");
const Celebrity = require('./../models/Celebrity.model')

//List the celebrity

router.get('/', (req, res) => {

    //res.send('HOLIHOLI')
    Celebrity
        .find() //Return Array
        .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities })
        })
        .catch((err) => console.log(err))
})

//Create Celebirty

router.get('/create', (req, res) => {

    //res.send('HOLIHOLI23')
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res) => {

    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .create({ name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})

// redirect(Le paso como parametro la ruta a la que quiero redirigir al usuario)


//Delete Celebrity

router.post('/:celebrity_id/delete', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findByIdAndRemove(celebrity_id)
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})

//Edit Celebrity

router.get('/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params

    Celebrity
        .findById(celebrity_id)
        .then((celebrity) => {
            res.render('celebrities/edit-celebrities', celebrity)
        })
        .catch(err => console.log(err))
})

router.post('/:celebrity_id/edit', (req, res) => {
    const { celebrity_id } = req.params
    const { name, occupation, catchPhrase } = req.body

    Celebrity
        .findByIdAndUpdate(celebrity_id, { name, occupation, catchPhrase })
        .then(() => {
            res.redirect('/celebrities')
        })
        .catch(err => console.log(err))
})


module.exports = router;