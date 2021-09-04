// const router = require('express').Router()
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
    res.render("index");
});

module.exports = router;



// router.get('/movies', (req, res) => {
//     res.send("movies")
// / })