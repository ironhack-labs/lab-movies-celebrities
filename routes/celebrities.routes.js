const router = require("express").Router();
const celebritiesController = require('../controllers/celebrities.controller.js');



router.get('/celebrities/create', celebritiesController.create);
router.post('/celebrities', celebritiesController.doCreate);

module.exports = router;