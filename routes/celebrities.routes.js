// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebritiesController = require("../controllers/celebrities.controller");

// all your routes here

router.get("/celebrities", celebritiesController.Celebrity);

//create new
router.get("/celebrities/create", celebritiesController.createCelebrity);
router.post("/celebrities/create", celebritiesController.doCreate);

//edit
router.get("/celebrities/:id/edit", celebritiesController.editCelebrity);
router.post("/celebrities/:id/edit", celebritiesController.doEdit);

//delete
router.post("/celebrities/:id/delete", celebritiesController.delete);

module.exports = router;