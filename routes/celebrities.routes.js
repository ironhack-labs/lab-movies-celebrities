// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
router.get("/", (req, res, next) => {
    res.render("index");
    
  });
  
router.get("/celebrities/create", (req,res,next) => {
    var newCelebrity = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    res.render("celebrities/new-celebrity")
})
router.post("/celebrities/create", (req,res,next) => {

})
module.exports = router;