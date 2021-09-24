const router = require("express").Router()
const authController = require("../controllers/auth.controller")


/* GET home page */
router.get("/signup", authController.signUp)

router.post("/signup", authController.signUpSubmit)

router.get("/login", authController.login)

router.post("/login", authController.loginSubmit)

router.post("/logout", authController.logoutUser)

module.exports = router