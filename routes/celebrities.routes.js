// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// GET route to show form for creating a celebrity
router.get('/celebrities/create', (req, res) => {
    res.render('celebrities/new-celebrity');
  });

// POST route to create a new celebrity
router.post('/celebrities/create', (req, res) => {
    const { name, occupation, catchPhrase } = req.body;
  
    const newCelebrity = new Celebrity({
      name,
      occupation,
      catchPhrase
    });
  
    newCelebrity.save()
      .then(() => {
        res.redirect('/celebrities'); // Redirect to list of celebrities
      })
      .catch((error) => {
        res.render('celebrities/new-celebrity', { error });
      });
  });

  // listing celebrities
  router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
      .then(celebrities => {
        res.render('celebrities/celebrities', { celebrities });
      })
      .catch(error => {
        next(error);
      });
  });
  

module.exports = router;