const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});


// router.get('/celebrities/create' , (req, res) => {
//     // res.render('celebrities/new-celebrity')
//     res.send('NO ME LA JUEGO')
// })
module.exports = router;
