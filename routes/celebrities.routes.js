const express = require('express');
const router = require("express").Router();
const celebritiesController = require('../Controllers/celebrities.controller');

// celebrities


router.get('/', celebritiesController.list);
router.get('/create', celebritiesController.createForm);
router.post('/create', celebritiesController.doCreate);


module.exports = router;