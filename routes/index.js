const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get(`./celebrities.routes`, (req, res) => {
  res.send(`Celebrities`)
})

module.exports = router;
