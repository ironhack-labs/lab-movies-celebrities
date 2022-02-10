// 1. IMPORTACIONES
const express		= require("express")
const router		= express.Router()
const celebritiesController		= require("./../controllers/celebritiesController")


router.get("/new-celebrity", celebritiesController.create)
router.post("/new-celebrity", celebritiesController.createForm)

module.exports = router