const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const routeGuards = require("./../middlewares/route-guard");

/* GET home page */
router.get("/signup", routeGuards.isLoggedOut, authController.signUp);

router.get("/login", routeGuards.isLoggedOut, authController.login);

router.post("/signup", routeGuards.isLoggedOut, authController.signUpSubmit);

router.post("/login", routeGuards.isLoggedOut, authController.loginSubmit);

router.post("/logout", authController.logoutUser);

module.exports = router;
