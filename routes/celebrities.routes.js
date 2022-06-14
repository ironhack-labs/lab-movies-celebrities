const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

// ---create---
router.get('/celebrities/create', (req, res, next) => {
  res.render('../views/celebrities/new-celebrity.hbs')
})
//---create---
router.post('/celebrities/create',(req, res, next) => {
  const {...allInfo} = req.body
  Celebrity.create(allInfo)
    .then(() => res.redirect('/celebrities'))
    .catch(err => {console.log('Error while creating: ',err)
      next()
    })
})
//---read---
router.get('/celebrities',(req, res, next) =>{
  Celebrity.find()
    .then(celebrities =>{
      res.render('../views/celebrities/celebrities.hbs',{celebrities})
    })
    .catch(err => {console.log('Error while rendering: ', err)
      next()
    })
})




module.exports = router