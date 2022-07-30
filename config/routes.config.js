const router = require('express').Router()
const miscController = require('../controllers/misc.controller')
const celebController = require('../controllers/celebrities.controller')
const moviesController = require('../controllers/movies.controller')

//MISC
router.get('/', miscController.home)

//CELEBRITIES
router.get('/celebrities/create', celebController.create)
router.post('/celebrities/create', celebController.doCreate)

router.get('/celebrities', celebController.list)

//MOVIES
router.get('/movies/create', moviesController.create)
router.post('/movies/create', moviesController.doCreate)

router.get('/celebrities', moviesController.list)

module.exports = router
