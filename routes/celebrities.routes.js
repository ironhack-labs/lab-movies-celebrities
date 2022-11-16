// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');
// all your routes here
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    
    Celebrity.create({ name, occupation, catchPhrase })
    .then(celebFromDb => console.log(`New celeb created: ${celebFromDb.name}.`))
    .then(() => res.redirect('/celebrities'))
    .catch(err => next(err))
});

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
      .then(allCelebFromDB => {
        console.log('Retrieved celeb from DB:', allCelebFromDB);
        res.render('./celebrities/celebrities', { celeb:allCelebFromDB });
      })
      .catch(err => next(err))
    });


module.exports = router;





// router.post('/celebrities', (req, res) => {
//     const { name, occupation, catchPhrase } = req.body;
//     res.send(`Name: ${name}, Occupation: ${occupation}, Phrase: ${catchPhrase}`)
// });