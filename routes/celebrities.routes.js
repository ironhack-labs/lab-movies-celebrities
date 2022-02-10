const router = require("express").Router();

const celebCtrl = require('../controllers/celebrities.controller');

router.get('/', celebCtrl.getCelebrities);

router.get('/create', celebCtrl.create);

router.post('/create', celebCtrl.createForm);

router.get('/:id', celebCtrl.getCelebrity);

router.get('/:id/edit', celebCtrl.editCelebrity);

router.post('/:id/edit', celebCtrl.editCelebrityForm);

router.post('/:id/delete', celebCtrl.deleteCelebrity);

module.exports = router;