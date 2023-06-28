const Celebrity = require('../models/Celebrity.model.js');


const getNewCelebrity = (req, res) => res.render('celebrities/new-celebrity.hbs');

const postNewCelebrity = (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch(error => next(error));
};

const getCelebrities = (req, res, next) => {
  Celebrity.find()
    .then(allTheCelebritiesFromDB => {
      console.log('Retrieved celebs from DB:', allTheCelebritiesFromDB);

      res.render('celebrities/celebrities.hbs', { celebrities: allTheCelebritiesFromDB });
    })
    .catch(error => {
      console.log('Error while getting the celebs from the DB: ', error);

      next(error);
    });
};


module.exports = {getNewCelebrity, postNewCelebrity, getCelebrities}
