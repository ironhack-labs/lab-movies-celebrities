// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js'); // <== add this line before your routes
 
// GET route to retrieve and display all the books
router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(allTheCelebritiesFromDB => {
      // -> allTheBooksFromDB is a placeholder, it can be any word
      /*console.log('Retrieved celebrities from DB:', allTheCelebritiesFromDB);
      */
      res.render('celebrities/celebrities.hbs', { celebrities: allTheCelebritiesFromDB});
    })
    .catch(error => {
      console.log('Error while getting the books from the DB: ', error);
 
      // Call the error-middleware to display the error page to the user
      next(error);
    });
});

router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity.hbs'));

router.post('/celebrities/create', (req, res, next) => {
    console.log(req.body);

    const { name, occupation, catchPhrase } = req.body;
 
    Celebrity.create({name, occupation, catchPhrase})
      .then(celibritiesFromDB => console.log(`New Celibrity created: ${celibritiesFromDB.name}.`))
      .catch(error => next(error));
});

module.exports = router;