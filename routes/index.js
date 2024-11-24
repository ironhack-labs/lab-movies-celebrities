const router = require("express").Router();
const celebritiesRoutes = require("./celebrities.routes");
const moviesRoutes = require("./movies.routes");

// GET home page
router.get("/", (req, res, next) => {
    res.render("index");
});

// Use celebrities routes
router.use("/celebrities", celebritiesRoutes);

// Use movies routes
router.use("/movies",moviesRoutes);

module.exports = router;

