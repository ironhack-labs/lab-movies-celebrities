const express = require('express')

const router = express.Router()

const movieController = require('../controllers/movies.controller')

router.get('/', movieController.list)
router.get('/create', movieController.create)
router.post('/create', movieController.doCreate)

router.get('/:id', movieController.detail)

router.post('/:id/delete', movieController.delete)

router.get('/:id/edit', movieController.edit)
router.post('/:id/edit', movieController.doEdit)


module.exports = router