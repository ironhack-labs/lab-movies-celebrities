const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model')

router.get('/', (req, res, next) => {
    Celebrity
    .find()
    .then(celebrity =>  res.render('celebrities/celebrities', {celebrity: celebrity}))
    .catch(err => console.log(console.error())) 
})


router.get('/create', (req, res, next) => {
    res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => {
    const {name, occupation, catchPhrase, isNOTSelected} = req.body
    let isSelected = isNOTSelected ? false: true
    Celebrity
    .create({name, occupation, catchPhrase, isSelected})
    .then(res.redirect('/celebrities'))
    .catch(res.render('celebrities/new-celebrity'))
})

router.post('/:_id/delete', (req, res, next) => {
    const { _id } = req.params
     Celebrity
      .findByIdAndDelete(_id)
      .then(() => res.redirect('/celebrities'))
      .catch(err => console.log(err)) 
  })

module.exports = router;