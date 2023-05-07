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
router.get('/:_id', (req, res, next) => {
    const {_id} = req.params
    
    Celebrity
      .findById(_id)
      .then(cebDetails => {
        res.render('celebrities/celebrities-details', cebDetails)
    })
      .catch(err => console.log(err))
}) 

router.get('/:_id/edit', (req,res,next) => {
    const {_id} = req.params
    Celebrity
    .findById(_id)
    .then(
        cebToEditData => {
            res.render('celebrities/edit-celebrity', cebToEditData)
        }
    )
})
router.post('/:_id/edit',(req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    const {_id} = req.params

  Celebrity
  .findByIdAndUpdate(_id, {name, occupation, catchPhrase})
  .then(() => res.redirect(`/celebrities/${_id}`))
  .catch(err => console.log(err))
})

router.post('/:_id/delete', (req, res, next) => {
    const { _id } = req.params
     Celebrity
      .findByIdAndDelete(_id)
      .then(() => res.redirect('/celebrities'))
      .catch(err => console.log(err)) 
  })

module.exports = router;