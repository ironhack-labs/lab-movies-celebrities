const router = require("express").Router();
const celebritiesController = require('../controllers/celebrities.controller');

router.get('/', celebritiesController.list);
router.get('/:id', celebritiesController.detail);
router.get('/create', celebritiesController.create)
router.post('/create', celebritiesController.doCreate)

module.exports = router