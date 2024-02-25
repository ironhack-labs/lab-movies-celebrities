const express = require("express")
const celebrityController = require('../controllers/celebrity.controller');
const movieController = require('../controllers/movie.controller');

const router = express.Router()

router.get('/', (req, res) => res.render('home'));

router.get('/celebrities', celebrityController.list);
router.get('/celebrities/new-celebrity', celebrityController.create);
router.post('/new-celebrity', celebrityController.doCreate);

router.get('/movies', movieController.list);
router.get('/movies/new-movie', movieController.create);
router.post('/new-movie', movieController.doCreate);
router.get('/movies/:id', movieController.details);
router.get('/movies/:id/edit-movie', movieController.edit);
router.post('/movies/:id/edit-movie', movieController.doEdit);
router.post('/movies/:id/delete', movieController.delete);

module.exports = router;