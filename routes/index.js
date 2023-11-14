const router = require("express").Router();

/* GET home page */
const celebrities = require('./celebrities.routes');
router.use('/', celebrities);

const movies = require('./movies.routes');
router.use('/', movies);

router.get('/', (req, res, next) => {
  res.render('index')
})

module.exports = router
