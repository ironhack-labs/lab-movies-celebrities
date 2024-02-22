// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// /* GET movies page */
router.get("/celebrities/new-celebrity", (req, res, next) => {
    res.render("new-celebrity");
  });

module.exports = router;


// linked to app.js so that server has access to it