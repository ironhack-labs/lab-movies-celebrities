//importaciones
const express = require('express');
const router = express.Router();
const celebsController = require('./../controllers/celebsCtrl')
const routeGuard = require('./../middlewares/routeGuard');

//list celebs
router.get('/', celebsController.getCelebs)

//view celeb
router.get('/:celebID/view', celebsController.viewCeleb)

//create celeb
router.get('/create',routeGuard.privateAreas, celebsController.newCeleb)
//create celeb
router.post('/create',routeGuard.privateAreas, celebsController.newCelebForm)


//edit celeb
router.get('/:celebID/edit',routeGuard.privateAreas, celebsController.editCeleb)
//edit celeb
router.post('/:celebID/edit',routeGuard.privateAreas, celebsController.editCelebForm)

//delete celeb
router.post('/:celebID/delete',routeGuard.privateAreas, celebsController.deleteCeleb)

//exportacion
module.exports = router