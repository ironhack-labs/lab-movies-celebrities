const express = require("express");
const router = new express.Router();

/* GET home page */
router.get("/", (req, res, next) => res.render("index"));

module.exports = router;
