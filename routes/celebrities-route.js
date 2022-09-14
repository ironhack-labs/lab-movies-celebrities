const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')  
});

router.post('/celebrities/create', (req, res, next) => {
  Celebrity.create({
    name: req.body.celebName,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
  .then(savedCeleb => {
    console.log('New Celeb added');
    res.redirect('/celebrities');

  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

router.get('/celebrities', (req,res,next) => {
  Celebrity.find()
  .then((celebData) => {
    res.render('celebrities/celebrities', {
      celebrityData: celebData
    })
  })
  .catch((err) => {
    res.send(err)
  })
})


module.exports = router;

                            