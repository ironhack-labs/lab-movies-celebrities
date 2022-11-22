const router = require("express").Router();
const express = require("express");
const app = express();

const celebritiesRoutes = require("./celebrities.routes");
app.use("/", celebritiesRoutes);

const moviesRoutes = require("./movies.routes");
app.use("/", moviesRoutes);

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
