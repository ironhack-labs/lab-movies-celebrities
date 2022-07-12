// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// CREATE: Render form
router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity"); 
})
  
// CREATE: Process form
router.post("/celebrities/create", (req, res) => {
    res.send("i am the post to create a new celbrity")
  })

module.exports = router;