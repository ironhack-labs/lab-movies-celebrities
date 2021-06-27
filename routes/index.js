const router = require("express").Router();
const Celebrity=('./models/Celebrity.model')
const Movie =('./models/Movie')
/* GET home page */
router.get("/", (req, res, next) => {res.render("index");});
router.get("/", (req, res, next) => {res.render("celebrities");});
router.get("/", (req, res, next) => {res.render("movies");});


module.exports = router;
