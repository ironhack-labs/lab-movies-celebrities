const router = require("express").Router();

const Celebrity = require('./../models/Celebrity.model')

/* GET home page */
router.get('/celebrities/create', (req, res) => {


  res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', (req, res) => {

  const { name, occupation, catchPhrase } = req.body

  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(() => res.redirect('/celebrities'))
    .catch(() => res.redirect('/celebrities/create'))

})

router.get('/celebrities', (req, res) => {

  Celebrity
    .find()
    .then(celebrities => res.render('celebrities/celebrities', { celebrities }))
    .catch(err => console.log(err))

})


module.exports = router;
