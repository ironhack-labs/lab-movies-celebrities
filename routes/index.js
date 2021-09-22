const router = require('express').Router()

const celebrityController = require('./../controllers/celebrityController')

const movieController = require('./../controllers/moviesController')
/* GET home page */
router.get('/', celebrityController.Home)

router.get('/celebrities/create', celebrityController.Create)

router.post('/celebrities/create', celebrityController.CreateFromForm)

router.get('/celebrities', celebrityController.list)

router.get('/movies/create', movieController.Create)

router.post('/movies/create', movieController.CreateFromForm)

router.get('/movies', movieController.list)

router.get('/movies/:id', movieController.Details)
router.post('/movies/:id/delete', movieController.Delete)

router.post('/movies/:id/edit', movieController.edit)
router.post('/movies/:id', movieController.update)

module.exports = router
