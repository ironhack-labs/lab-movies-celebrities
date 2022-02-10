
const express		= require("express")
const router = require("express").Router();

const celebritiesController		= require("./../controllers/celebritiesController")



// homepage celebrities 
router.get("/",celebritiesController.getCelebs)

// create celebrities
router.get("/create",celebritiesController.createCelebs)

// post form
router.post("/create",celebritiesController.createCelebsForm)






module.exports = router;