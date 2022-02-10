const express = require('express');
const router = express.Router();
const moController = require("../controllers/moController")


router.get("/create", moController.createMovies)
router.post("/create", moController.createMoviesForm)

router.get("/", moController.getMovies)

router.get('/:id', moController.getMoviesOne);

// Iteration #4: Update the drone
// router.get("/drones/:id/edit", droneController.updateDrones)
// // Iteration #4: Update the drone
// router.post("/drones/:id/edit", droneController.updateDronesForm)
// Iteration #5: Delete the drone
router.post("/:id/delete", moController.deleteMovies)

// CREAR PAGINA PARA EDITAR
router.get("/:id/edit", moController.editMovies)
// ENVIAR DATOS DE FORMULARIO PARA EDITAR LIBRO EN BD
router.post("/:id/edit", moController.editMoviesForm)

module.exports = router