const express = require('express');
const router = require("express").Router();

const moviesController = require('../Controllers/movies.controller');

// Movies routes
router.get("/movies", moviesController.list);
router.get("/movies/create", moviesController.create);
router.post("/movies/create", moviesController.doCreate);
router.get("/movies/:id", moviesController.detail);
router.post("/movies/:id/delete", moviesController.delete);
router.get("/movies/:id/edit", moviesController.edit);
router.post("/movies/:id/edit", moviesController.doEdit);


module.exports = router;