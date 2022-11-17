// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');
// all your routes here
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
});

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
    
    Celebrity.create({ name, occupation, catchPhrase })
      .then(celebFromDb => console.log(`New celeb created: ${celebFromDb.name}.`))
      .then(() => res.redirect('/celebrities'))
      .catch(err => {
          res.render('celebrities/new-celebrity');
        })
});

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
      .then(allCelebFromDB => {
        // console.log('Retrieved celeb from DB:', allCelebFromDB);
        res.render('./celebrities/celebrities', { celebrities: allCelebFromDB });
      })
      .catch(err => next(err))
});

router.get('celebrities/:id', (req, res) => {
    const id = req.params.id;

    Celebrity.findById(id)
      .then(celebrity => {
          res.render('celebrities/celebrity-details', { celebrity })
      })
      .catch(err => next(err))
})

module.exports = router;