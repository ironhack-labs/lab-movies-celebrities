const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const celebritiesRoutes = require('./celebrities.routes'); // <== import (require) celeb routes
router.use('/celebrities', celebritiesRoutes); // <== use celeb routes

// Movies middleware
module.exports = router;
