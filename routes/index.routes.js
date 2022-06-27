const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/celebrities/create', (req, res) => {
  res.render('celebrities/new-celebrity')
})


module.exports = router;
