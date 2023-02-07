const router = require("express").Router();
const celebritiesController = require('../controllers/celebrities.controller');

router.get('/', celebritiesController.list);
router.get('/create', celebritiesController.create)
router.post('/create', celebritiesController.doCreate)
router.get('/:id', celebritiesController.detail);



module.exports = router;