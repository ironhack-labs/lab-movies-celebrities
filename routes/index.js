const router = require("express").Router()

router.get("/", (req, res, next) => {
  res.render("index")
})


// ---------> CELEBRITIES ROUTES <---------
router.use('/celebrities', require('./celebrities.routes'))




// // ---------> MOVIES ROUTES <---------
router.use('/movies', require('./movies.routes'))


module.exports = router
