// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
// const router = require("express").Router();
// const Movie = require("../models/Movie.model");

// // all your routes here
// router.get("/movies", (req, res, next) => {
//     Movie.find()
//         // .populate('author')
//         .then( (moviesFromDB) => {
//             const data = {
//                 moviesArr: moviesFromDB
//             }
//             res.render("movies/movies", data);
//         })
//         .catch( (error) => {
//             console.log("Error getting list of movies from DB", error);
//             next(error);
//         });
// });


// module.exports = router;