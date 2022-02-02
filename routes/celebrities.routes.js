// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')


// all your routes here
//celebrity get
router.get('/celebrities/create', (req, res, next) => {
    console.log('going to render page')
    res.render('celebrities/new-celebrity.hbs')
})
//celebrity post create new.

router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body;

    Celebrity.create({name, occupation, catchPhrase})
        .then (() => res.redirect('/celebrities'))
        .catch(error => res.render('celebrities/new-celebrity.hbs'))
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
        .then(allCelebsFromDb => {
            res.render('celebrities/celebrities.hbs', { celeb: allCelebsFromDb})
        })
        .catch(error => console.log('Error in list:', error))

})



module.exports = router;