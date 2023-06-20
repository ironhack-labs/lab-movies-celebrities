// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')
const Movies = require('../models/Movie.model')

// all your routes here

router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
});

router.post('/create', (req, res, next) => {
    const {name , occupation, catchPhrase} = req.body;
    const newCelebrity = new Celebrity ({name, occupation, catchPhrase})

    newCelebrity.save()
    .then(() => {
        res.render('celebrities')
    })
    .catch(err => res.render('celebrities/new-celebrity', {err}))
});

router.get('/', (req, res, next) => {
    Celebrity.find()
    .then((dataCelebrity) => {
        res.render('celebrities/celebrities', {celebrity: dataCelebrity})
    })
    .catch((err) => console.log('err pass the data Celebrity', {err}))
});

module.exports = router;