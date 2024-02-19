const router = require("express").Router();
const celebrities = require('../controllers/celebrities.controller');
const movies = require('../controllers/movies.controller');
/* GET home page */

router.get('/', celebrities.index);
router.get('/celebrities/create', celebrities.createCelebrities);
router.post('/celebrities/create', celebrities.doCreateCelebrities);
router.get('/celebrities', celebrities.list);
router.get('/movies/create', movies.createMovie);
router.post('/movies/create', movies.doCreateMovie);
router.get('/movies', movies.list);
router.get('/movies/:id', movies.details);
router.post('/movies/:id/delete', movies.delete);
router.get('/movies/:id/edit', movies.editMovie);
router.post('/movies/:id/edit', movies.doEditMovie);

module.exports = router;
