const router = require("express").Router();
const Celebrities = require('/models/celebrities.model')
// all your routes here

//GET route
router.get('/celebrities/create', (req, res, next) => {
    res.render('celebrities/new-celebrity');
  });

  router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;
  
    Celebrities.create({ name, occupation, catchPhrase })
      .then((createdCelebrity) => {
        console.log(`Created new celebrity ${createdCelebrity.title}`);
        res.redirect('/celebrities');
      })
      .catch((err) => next(err));
  });


  router.get('/celebrities', (req, res, next) => {
    Celebrities.find()
      .then((allCelebrities) => res.render('celebrities/celebrities', { celebrities: allCelebrities }))
      .catch((err) => {
        console.log('Error while creating the celebrity');
        next(err);
      });
  });




module.exports = router;