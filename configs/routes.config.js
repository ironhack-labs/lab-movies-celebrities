const express = require('express');
const misc = require('../controllers/misc.controller');
const celebrities = require('../controllers/celebrities.controller');
const movies = require('../controllers/movies.controller');

const router = express.Router();

router.get("/", misc.home);

router.get('/celebrities/create', celebrities.create);
router.post('/celebrities/create', celebrities.doCreate);
router.get('/celebrities', celebrities.list);

router.get('/movies/create', movies.create);
router.post('/movies/create', movies.doCreate);
router.get('/movies', movies.list);
router.get('/movies/:id', movies.detail);
router.post('/movies/:id/delete', movies.delete);
router.get('/movies/:id/edit', movies.edit);
router.post('/movies/:id/edit', movies.doEdit);
  
module.exports = router;