const express = require('express');
const router  = express.Router();
const Celebrity = require('../../models/celebrity.model')

const title  = "this is a title"

router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render('celebrities/celebrities', { celebrities })
    })
    .catch((err) => {

    })
});

router.get('/new', (req, res, next) => {
  res.render('celebrities/new-celebrity')
})

router.post('/create', (req, res, next) => {
  const celebrity = req.body

  Celebrity.create(celebrity)
    .then(() => {
      res.status(200).redirect("/")
    })
    .catch((err) => {
      res.render('celebrities/new-celebrity')
    })
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id

  Celebrity.findById(id)
    .then((celebrity) => {
      res.render('celebrities/celebrity-detail', { celebrity })
    })
    .catch((err) => {
      console.error(err)
    })
})

module.exports = router;