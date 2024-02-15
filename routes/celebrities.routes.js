// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const celebrity = require("../controllers/celebrities.controllers")

// all your routes here

router.get("/celebrities/create", celebrity.create)
router.post("/celebrities/create", celebrity.doCreate)
router.get("/celebrities", celebrity.list)


module.exports = router;