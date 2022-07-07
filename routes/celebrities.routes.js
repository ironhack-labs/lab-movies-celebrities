// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');

//check above path

router.get('/celebrities/create', (req, res, next) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', (req, res, next) => {
const {name, occupation, catchPhrase} = req.body;

Celebrity.create(req.body)
.then(newCelebrity =>  {
    console.log("New celeb:", newCelebrity)
    res.redirect(`/celebrities/${newCelebrity._id}`)
}).catch((err) => {
    console.log(err);
res.render('/celebrities.create');
});
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then((celebArray) => {
    console.log('Retrieved celebs', celebArray);
    res.render('celebrities/celebrities.hbs', {celebArray})
    }).catch((err) => {
        console.log(err)
        next(err)
    })
})

router.get('/celebrities/:celebrityId', (req, res, next) => {
Celebrity.findById(req.params.celebrityId)
.then((aCeleb) => {
console.log('a new celeb', aCeleb);
res.render('celebrities/singleCelebrity.hbs', {aCeleb})
}).catch((err) => {
    console.log(err)
    next(err)
})
})

module.exports = router;
