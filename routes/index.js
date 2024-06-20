const router = require("express").Router();


/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// ITERATION 1
// Import the route files
const celebritiesRoutes = require ("./celebrities.routes")
const moviesRoutes = require("./movies.routes");

// Link the route files to the main router
router.use("/celebrities", celebritiesRoutes);
router.use("/movies", moviesRoutes);

// ITERATION 1(END)



//NOTE:

/* Line 9 to 15 could have been add to the app.js accordingly:
//Import the route files
const celebritiesRoutes = require ("./routes/celebrities.routes")
const moviesRoutes = require("./routes/movies.routes");

// Link the route files to the main router
app.use("/celebrities", celebritiesRoutes);
app.use("/movies", moviesRoutes); */



module.exports = router;

