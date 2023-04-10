const express = require("express");
const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { layout: false });
});

module.exports = router;
