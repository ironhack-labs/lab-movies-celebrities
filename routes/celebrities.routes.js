const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("celebrities/celebrities")
})

module.exports = router;