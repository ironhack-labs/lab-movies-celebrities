const router = require("express").Router();
const celebrityController = require('../controllers/celebrities.controller');
const movieController = require('../controllers/movies.controller');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", {title: 'Celebrities'});
});

router.get('/celebrities/create', celebrityController.createCelebrity);
router.post('/celebrities/create', celebrityController.doCreateCelebrity);

module.exports = router;