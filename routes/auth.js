const router = require("express").Router()
const authController = require("./../controllers/auth.controller")


/* GET home page */
router.get("/signup", authController.signUp)

router.get("/login", authController.login)


module.exports = router;