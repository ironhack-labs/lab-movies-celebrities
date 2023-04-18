const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/celebrities', (req, res, next) => {
  Celebrity.find()
    .then(celebrities => {
      console.log('************** Celebrities: ***********', celebrities)
      res.render('celebrities/celebrities', { celebrities: celebrities })
    })
    .catch(err => console.log(err))
})
// all your routes here
router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req, res, next) => {
  console.log(req.body)
  Celebrity.create({
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  })
  .then(createdCelebrity => {
    console.log('---------------- Created Celebrity: ---------------------' + createdCelebrity)
    res.redirect('/celebrities')
  })
})

module.exports = router;