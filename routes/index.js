const router = require("express").Router()
const celebritiesRouter = require("./celebrities.routes")
const moviesRouter = require("./movies.routes")

router.get("/", (req, res, next) => {res.render("index")})

router.get("/celebrities", celebritiesRouter)
router.get("/celebrities/create", celebritiesRouter)
router.post("/celebrities/create", celebritiesRouter)

router.get("/movies", moviesRouter)
router.get("/movies/create", moviesRouter)
router.post("/movies/create", moviesRouter)

router.get("/:movieId", moviesRouter)
router.post("/movies/:movieId/delete", moviesRouter)
router.get("/movies/:movieId/edit", moviesRouter)
router.post("/movies/:movieId/edit", moviesRouter)



module.exports = router
