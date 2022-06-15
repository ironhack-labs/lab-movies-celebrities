const router = require('express').Router();
const Celebrity = require('../models/Celebrity.model');

//create
router.get('/celebrities/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')
})
//create
router.post('/celebrities/create',(req, res, next) => {
  const {...allInfo} = req.body
  Celebrity.create(allInfo)
    .then(() => res.redirect('/celebrities'))
    .catch(err => {console.log('Error while creating: ',err)
    next()
  })
})
//read
router.get('/celebrities',(req, res, next) =>{
  Celebrity.find()
    .then(celebrities => res.render('celebrities/celebrities',{celebrities}))
    .catch(err => {console.log('Error while rendering: ', err)
    next()
  })
})
//read
router.get('/celebrities/:id',(req, res, next) => {
  const {id} = req.params
  Celebrity.findById(id)
    .then(celebrity =>res.render('celebrities/celebrity-detail',{celebrity}))
    .catch(err => {
      console.log('Error ',err)
      next()
    })
})
//update
router.get('/celebrities/:id/edit',(req, res, next) => {
  const {id} = req.params
  Celebrity.findById(id)
    .then(celebrityEdit => res.render('celebrities/edit-celebrity',{celebrity: celebrityEdit}))
    .catch(err => {
      console.log(`Error`, err)
      next()
    })
})
//update
router.post('/celebrities/:id/edit',(req, res, next) => {
  const {id} = req.params
  const {...allInfo} = req.body
  Celebrity.findByIdAndUpdate(id, allInfo)
    .then(() => res.redirect(`/celebrities/${id}`))
    .catch(err =>{
      console.log(`Error while editing celebrity`,err)
      next()
    })
})
//delete
router.post('/celebrities/:id/delete',(req, res, next) =>{
  const {id} = req.params
  Celebrity.findByIdAndDelete(id)
    .then(() => res.redirect('/celebrities'))
    .catch(error => {
      console.log('Error while deleting:',error)
      next()
    })
})

module.exports = router;