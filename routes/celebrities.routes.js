const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')


router.get('/celebrities/create', (req,res) => {

    res.render('celebrities/new-celebrity')

})

router.post('/celebrities/create', (req,res) =>{

    const { name, ocupation, catchPhrase } = req.body

    Celebrity
        .create({ name, ocupation, catchPhrase })
        .then(newCeleb => {

            res.redirect('/celebrities')

        })
        .catch(err => {res.render(err)})
    
})


router.get('/celebrities', (req, res) => {

    Celebrity
        .find()
        .then(celeb => {
            res.render('celebrities/celebrities', { celeb })
        })
        .catch(err => console.log(err))
})


module.exports = router;