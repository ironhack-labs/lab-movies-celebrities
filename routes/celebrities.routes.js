// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model')


// all your routes here
router.get('/create', (req, res, nex) => {
    res.render('../views/celebrities/new-celebrity.hbs')
});

router.post('/create', (req, res, nex) => {
   
    Celebrity.create( {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    })
    .then(createdCeleb => {
        console.log('new celeb created', createdCeleb)
        // res.send(createdCeleb)
        res.redirect('/')
    })
    .catch(err => {
        res.redirect('/new-celebrity')
        console.log(err)
    })
})

router.get('/celebrities', (req, res, nex) => {
    Celebrity.find()
    .then(celebrities => {
        console.log(celebrities)
        res.render('celebrities/celebrities', { celebrities})
    })
    .catch(err => console.log(err))
})




module.exports = router;