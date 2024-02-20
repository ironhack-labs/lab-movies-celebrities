const express = require('express');
const router = express.Router();

const celebrities = require('../controllers/celebrities.controllers')
const movies = require('../controllers/movies.controllers')



module.exports = router