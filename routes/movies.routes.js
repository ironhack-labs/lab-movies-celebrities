const router = require("express").Router();

// all your routes here
router.get("/", (req, res) => {
    res.render("movies/movies");
})

module.exports = router;