const router = require("express").Router();
const celebrities = require('../controllers/celebrities.controller');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

// CELEBRITIES

router.get('/celebrities/create', celebrities.create);
router.post('/celebrities/create', celebrities.doCreate);
router.get('/celebrities', celebrities.list)

module.exports = router;
