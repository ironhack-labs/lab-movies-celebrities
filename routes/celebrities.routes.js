// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// all your routes here

router.get('/', (req, res) => {
    Celebrity.find()
    .then(allCelebrities => {
        console.log(allCelebrities)
      res.render('celebrities/celebrities', {allCelebrities})
    }).catch((error)=> {console.log('upsie, this is not cool!', error)})
  });

router.get('/create', (req, res)=> {
    res.render('celebrities/new-celebrity');
})

router.post('/create', (req, res)=> {
    const {name, occupation, catchphrase} = req.body
    Celebrity.create({name, occupation, catchphrase})
    .then(newCelebrity => res.redirect('/celebrities'))
    .catch(error => res.render('celebrities/new-celebrity'))
})

module.exports = router;
