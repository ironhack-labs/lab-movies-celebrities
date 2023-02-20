// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/create', (req, res) => {
    res.render('celebrities/new-celebrity');
  });


router.post('/create', (req, res) => {
    const newCelebrity = new Celebrity({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchPhrase
    });
  
    newCelebrity.save()
      .then(() => {
        res.redirect('/celebrities');
      })
      .catch((error) => {
        res.render('celebrities/new-celebrity', { error: error.message });
      });
  });
module.exports = router;