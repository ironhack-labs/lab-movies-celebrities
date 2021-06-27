const router = require('express').Router()

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

// require('./celebs/')
// require('./movies/')

module.exports = router
