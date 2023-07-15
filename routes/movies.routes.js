const express = require('express');
const router = require("express").Router();

const moviesController = require('../Controllers/movies.controller');

//router.get('/', celebritiesController.list);
router.get('/create', moviesController.create);
//router.post('/create', celebritiesController.doCreate);


module.exports = router;