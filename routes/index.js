//importaciones
const express = require('express');
const router = express.Router();
const indexController = require('./../controllers/indexCtrl')

//ruta index
router.get('/', indexController.getHome)


//exportacion
module.exports = router