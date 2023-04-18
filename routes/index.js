const router = require("express").Router();
const celebrities = require('./celebrities.routes');
const movies = require('./movies.routes');

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/views", (req, res, next) => {
  res.render("celebrities");
});
router.get("/views", (req, res, next) => {
  res.render("movies");
});



  /*<--router.post("/celebrities/create", (req, res, next) => {
    console.log(req.body)
    const { name, occupation, catchPhrase } = req.body;
  
    .create({ title: name, occupation, catchPhrase})
      .then(createCelebrity => {
        console.log(createCelebrity)
        res.redirect(`/celebrities/create/${createCelebrity}`)
      })
      .catch(err => next(err))
  }) */



router.use('/celebrities', celebrities);
router.use('/movies', movies);

module.exports = router;




