const router = require("express").Router();
const {getNewCelebrity, postNewCelebrity, getCelebrities} = require("../controllers/celebrities.controller.js");


router.get('/celebrities/create', getNewCelebrity);

router.post('/celebrities/create', postNewCelebrity);

router.get('/celebrities', getCelebrities);


module.exports = router;
