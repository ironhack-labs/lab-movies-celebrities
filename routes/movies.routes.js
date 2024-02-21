const express = require('express')

const router = express.Router()

const movieController = require('../controllers/movies.controller')

router.get('/', movieController.list)
router.get('/create', movieController.create)
router.post('/create', movieController.doCreate)

module.exports = router