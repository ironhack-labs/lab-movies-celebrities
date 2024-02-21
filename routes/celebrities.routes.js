const express = require('express')

const router = express.Router()

const celebController = require('../controllers/celebrities.controller')
//routes here
router.get('/create', celebController.create)
router.post('/create', celebController.doCreate)


module.exports = router