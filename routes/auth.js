//importaciones
const express = require('express');
const router = express.Router();
const authController = require('./../controllers/authCtrl');
const routeGuard = require('./../middlewares/routeGuard');

//router
//signup - obtener pagina
router.get('/signup', routeGuard.authAreas, authController.register)

//signup - enviar formulario
router.post('/signup', routeGuard.authAreas, authController.registerForm)

//login - obtener pagina
router.get('/signin', routeGuard.authAreas, authController.signin)

//login - enviar formulario de logi
router.post('/signin', routeGuard.authAreas, authController.signinForm)

//ruta signupcheck
router.get('/signupcheck', authController.getSignUpCheck)

//logout
router.get('/logout', authController.logout)

//exportacion
module.exports = router  