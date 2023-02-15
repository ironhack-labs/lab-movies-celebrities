const router = require('express').Router()
const express = require('express')
/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Movies and Celebrities' })
})

router.use('/celebrities', require('./celebrities.routes'))
router.use('/movies', require('./movies.routes'))

module.exports = router
