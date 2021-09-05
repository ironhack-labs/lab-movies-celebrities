const router = require("express").Router();

const Celebrity = require('./models/Celebrity.model')


router.get('/celebrities/create', (req, res) => {

    Celebrity
      .find()
      .select('name')
      .then(celebrities => res.render('celebrities/list', { celebrities }))
      .catch(err => console.log(err))

})

module.exports = router;

router.post('/celebrities/create', (req, res) => {

  const { name, occupation, catchPhrase } = req.body

  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(theCelebrity => res.redirect(`/celebrities/list/${theCelebrity._id}`))
    .catch(err => res.render('/celebrities/new celebrity'))
})






