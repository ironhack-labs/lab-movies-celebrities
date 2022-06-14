const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');


router.get('/celebrities/create', (req, res, next) => {
  res.render('../views/celebrities/new-celebrity.hbs')
})

router.post('/celebrities/create',(req, res, next) => {
  const {...allInfo} = req.body

  Celebrity.create(allInfo)
    .then(() => res.redirect('/celebrities'))
    .catch(err => {
      console.log('Error while creating a celebrity:',err)
      next()
    })
})



module.exports = router