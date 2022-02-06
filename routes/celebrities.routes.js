const router = require("express").Router()
const {redirect} = require("express/lib/response")
const Celebrity = require('../models/Celebrity.model')


router.get("/create", (req, res) => {
    res.render('celebrities/new-celebrity')
})

router.post("/create", (req, res) => {
  const { name, occupation, catchPhrase, imageUrl } = req.body
  if (Error) {
    res.render('celebrities/new-celebrity')
  }

  Celebrity
  .create({ name, occupation, catchPhrase, imageUrl })
  .then(() => res.redirect('/celebrities'))
  .catch(err => console.log('Pringasteeee', err))
  
})

router.get("/", (req, res) => {
  Celebrity
  .find()
  .then(newCelebrities => res.render('celebrities/celebrities', {newCelebrities}))
  .catch(err => console.log('Pringasteeee', err))

})

router.get('/:id', (req, res) => {
  const {id} = req.params
  Celebrity
  .findById(id)
  .then(selectedCelebrity => res.render('celebrities/celebrity-details', selectedCelebrity))
  .catch(err => console.log(err))

})

router.post('/:id/delete', (req, res) => {
  const {id} = req.params
  Celebrity
  .findByIdAndDelete(id)
  .then(() => res.redirect('/celebrities'))
  .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const {id} = req.params
  Celebrity
  .findById(id)
  .then(celebrityToEdit => res.render('celebrities/edit-celebrity', celebrityToEdit))
  .catch(err => console.log(err))
})

router.post('/:id/edit', (req, res) => {
  const {id} = req.params
  const { name, occupation, catchPhrase, imageUrl } = req.body
  Celebrity
  .findByIdAndUpdate(id,{ name, occupation, catchPhrase, imageUrl }, {new: true})
  .then(() => res.redirect(`/celebrities/${id}`))
  .catch(err => console.log(err))
})


module.exports = router