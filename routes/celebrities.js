//importaciones
const express = require('express');
const router = express.Router();
const celebsController = require('./../controllers/celebsCtrl')

//list celebs
router.get('/', celebsController.getCelebs)


//create celeb
router.get('/create', celebsController.newCeleb)
//create celeb
router.post('/create', celebsController.newCelebForm)


//edit celeb
router.get('/:id/edit', celebsController.editCeleb)
//edit celeb
router.post('/:id/edit', celebsController.editCelebForm)

//delete celeb
router.get('/:id/delete', celebsController.deleteCeleb)

//exportacion
module.exports = router