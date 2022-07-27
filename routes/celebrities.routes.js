const router = require("express").Router();

// CONTROLLERS
const celebritiesController = require('../controllers/celebrities.controller');

// LIST CELEBRITIES
router.get('/celebrities', celebritiesController.list);

// ADDING NEW CELEBRITIES
router.get('/celebrities/create', celebritiesController.create);
router.post('/celebrities/create', celebritiesController.doCreate);

// CELEBRITY DETAIL
router.get('/celebrities/:id', celebritiesController.detail);

// DELETE CELEBRITIES
router.post('/celebrities/:id/delete', celebritiesController.delete);

// EDIT CELEBRITIES
router.get('/celebrities/:id/edit', celebritiesController.edit);
router.post('/celebrities/:id/edit', celebritiesController.doEdit);

// EXPORT ALL THE ROUTES
module.exports = router;