const router = require('express').Router()
const miscController = require('../controllers/misc.controller')
const celebritiesController = require('../controllers/celebrities.controller')
const moviesController = require('../controllers/movie.controller')

//MISC
router.get('/', miscController.home)

//celebrities
router.get('/celebrities/new-celebrity', celebritiesController.create)
router.post('/celebrities', celebritiesController.doCreate)


router.get('/celebrities', celebritiesController.list)

//router.get('/celebrities/:id', celebritiesController.celebritiesDetail)

//router.get('/celebrities/:id/edit', celebritiesController.edit)
//router.post('/celebrities/:id', celebritiesController.doEdit)

router.post('/celebrities/:id/delete', celebritiesController.delete)




//Movies
router.get('/movies/new', moviesController.create);
router.post('/movies', moviesController.doCreate);

router.get('/movies', moviesController.list);

router.post('/movies/:id/delete', moviesController.delete)

module.exports = router