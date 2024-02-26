const express = require('express')

const router = express.Router()

const celebController = require('../controllers/celebrities.controller')

//routes here
router.get('/', celebController.list)
router.get('/create', celebController.create)
router.post('/create', celebController.doCreate)

router.get('/:id', celebController.detail)

router.post('/:id/delete', celebController.delete)

router.get('/:id/edit', celebController.edit)
router.post('/:id/edit', celebController.doEdit)

module.exports = router