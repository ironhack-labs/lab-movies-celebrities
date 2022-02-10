//importaciones
const express = require('express');
const router = express.Router();
const celebsController = require('./../controllers/celebsCtrl')

//list celebs
router.get('/', celebsController.getCelebs)

//view celeb
router.get('/:celebID/view', celebsController.viewCeleb)

//create celeb
router.get('/create', celebsController.newCeleb)
//create celeb
router.post('/create', celebsController.newCelebForm)


//edit celeb
router.get('/:celebID/edit', celebsController.editCeleb)
//edit celeb
router.post('/:celebID/edit', celebsController.editCelebForm)

//delete celeb
router.post('/:celebID/delete', celebsController.deleteCeleb)

//exportacion
module.exports = router