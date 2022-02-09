const router = require("express").Router();

const celebCtrl = require('../controllers/celebrities.controller');

router.get('/', celebCtrl.getCelebrities);

router.get('/create', celebCtrl.create);

router.post('/create', celebCtrl.createForm);

module.exports = router;