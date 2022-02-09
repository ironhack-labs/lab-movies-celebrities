
const express		= require("express")
const router = require("express").Router();

const celebritiesController		= require("./../controllers/celebritiesController")



// homepage celebrities 
router.get("/",celebritiesController.celebs)

// get celebrities
router.get("/create",celebritiesController.getCelebs)

// post form
router.post("/create",celebritiesController.createCelebs)








module.exports = router;