const router = require("express").Router();
const celebritiesController = require('../controllers/celebrities.controller');

const Celebrity = require("../models/Celebrity.model")

router.get('/celebrities', celebritiesController.list)
router.get('/celebrities/create', celebritiesController.create);
router.post('/celebrities/create', celebritiesController.doCreate);

module.exports = router;