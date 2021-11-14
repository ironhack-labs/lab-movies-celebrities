const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/', (req, res, next) => {
  
  Celebrity.find()
  .then(allCelebrities => {
    res.render('celebrities/celebrities', { allCelebrities})
  })
  .catch(err => {
    res.render("celebrities/celebrities", { err })
  })
  
});

router.get('/create', (req, res, next) => res.render('celebrities/new-celebrity'));

router.post('/create', (req, res, next) => {
    Celebrity.create({
      name: req.body.name,
      occupation: req.body.occupation,
      catchPhrase: req.body.catchphrase ,
    })
      .then(celebrity => {
          res.redirect("/celebrities")
        })
      .catch(err => {
        res.render("celebrities/new-celebrity", { err })
      })
});


module.exports = router;