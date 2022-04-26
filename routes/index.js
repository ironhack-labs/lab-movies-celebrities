const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.use('/celebrities', require('./celebrities.routes'))

router.use('/movies', require('./movies.routes'))

router.get('/create', (req,res) => {
  Celebrity
      .find()
      .then(celebrities => {
          res.render('movies/new-movie', {celebrities})
      })
      .catch(err => console.log(err))
})


module.exports = router;
