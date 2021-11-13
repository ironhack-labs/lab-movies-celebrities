const router = require('express').Router()
const Celebrity = require('./../models/Celebrity.model')

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/celebrities', { celebrities })
    })
    .catch((err) => console.error(err))
})

router.get('/create', (req, res, next) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body

  Celebrity.create(req.body)
    .then(() => res.redirect('/celebrities'))
    .catch(() =>
      res.render('celebrities/new-celebrity', {
        errorMessage: 'Error creating a new celebrtity',
      })
    )
})

router.get('/:celebId', (req, res, next) => {
  Celebrity.findById(req.params.celebId)
    .then((celeb) => res.render('celebrities/celebrity-details', celeb))
    .catch((err) => console.error(err))
})

router.post('/:celebId/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.celebId)
    .then(() => res.redirect('/celebrities'))
    .catch((err) => console.error(err))
})

router.get('/:celebId/edit', (req, res, next) => {
  Celebrity.findById(req.params.celebId)
    .then((celeb) => res.render('celebrities/edit-celebrity', celeb))
    .catch((err) => console.error(err))
})

router.post('/:celebId/edit', (req, res, next) => {
  Celebrity.findByIdAndUpdate(req.params.celebId, req.body)
    .then(() => res.redirect(`/celebrities/${req.params.celebId}`))
    .catch((err) => console.error(err))
})

module.exports = router
