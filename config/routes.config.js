const router = require('express').Router();
const miscController = require('../controllers/misc.controller');
const celebrityController = require('../controllers/celebrity.controller');
const movieController = require('../controllers/movie.controller');


router.get('/', miscController.home);

//Celebrities
router.get('/celebrities/new', celebrityController.create);
router.post('/celebrities', celebrityController.doCreate);

router.get('/celebrities', celebrityController.list);
router.get('/celebrities/:id', celebrityController.details);

router.get('/celebrities/:id/edit', celebrityController.edit);
router.post('/celebrities/:id', celebrityController.doEdit);

router.post('/celebrities/:id/delete', celebrityController.delete);

//Movies
router.get('/movies/new', movieController.create);
router.post('/movies', movieController.doCreate);

router.get('/movies', movieController.list);
router.get('/movies/:id', movieController.details);

router.get('/movies/:id/edit', movieController.edit);
router.post('/movies/:id', movieController.doEdit);

router.post('/movies/:id/delete', movieController.delete);

module.exports = router;
