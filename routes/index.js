const router = require("express").Router();

/* GET 'home'/root page */
router.get("/", (req, res) => res.render("index"));

module.exports = router;
