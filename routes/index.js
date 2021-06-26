const router = require("express").Router();
const celebrityController = require('../controllers/celebrities.controller');
const movieController = require('../controllers/movies.controller');

// Home page
router.get("/", (req, res, next) => {
  res.render("index");
});

// Rutas de celebrities
router.get('/celebrities/create', celebrityController.createCelebrity);
router.post('/celebrities/create', celebrityController.doCreateCelebrity);

router.get('/celebrities/', celebrityController.findCelebrity);

router.get("/celebrities/:id/edit", celebrityController.editCelebrity);
router.post("/celebrities/:id/edit", celebrityController.doEditCelebrity);


// Rutas de movies
router.get('/movies/create', movieController.createMovie);
router.post('/movies/create', movieController.doCreateMovie);

router.get('/movies/', movieController.findMovie);

router.get('/movies/:id', movieController.findId);

router.post('/movies/:id/delete', movieController.deleteMovie);

router.get('movies/:id/edit', movieController.edit)
router.post('movies/:id/edit', movieController.doEdit)

// Exportación de rutas
module.exports = router;