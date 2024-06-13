const router = require("express").Router()


const celebrities = require('./celebrities')
router.use("/", celebrities)

const movies = require('./movies')
router.use("/", movies)



router.get("/", (req, res, next) => {
  res.render("index")
})



module.exports = router
