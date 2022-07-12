// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")

router.get("/movies/create", (req, res) => {
    Celebrity.find()
    .then(result => {
        res.render("movies/new-movie", {result})
    })
    .catch((error) => {
        console.log("Error connecting to DB", error)
    });
});


router.post("/movies/create", (req, res) => {

    Movie.create(req.body)
        .then(() => {
            res.redirect("/movies");
        })
        .catch((error) => {
            console.log("Error creating new movie", error)
            res.render("movies/new-movie")
        });
});


router.get("/movies", (req, res) => {
    Movie.find()
    .then(result => {
        res.render("movies/movies", {result})
    })
    .catch((error) => {
        console.log("Error connecting to DB", error)
    });
})

router.get("/movies/:id", (req,res) => {
    const id = req.params.id;
    Movie.findById(id)
    .populate("cast")
    .then( result => {
        res.render("movies/movie-details", {result})
    })
    .catch((error) => {
        console.log("Error connecting to DB", error)
    });
})

router.post("/movies/:id/delete", (req, res) => {
    const id = req.params.id;
    Movie.findByIdAndRemove(id)
    .then(result => res.redirect("/movies"))
    .catch((error) => {
        console.log("Error deleting movie from DB", error)
    });
})

router.get("/movies/:id/edit", (req, res) => {
    const id = req.params.id;

    Movie.findById(id)
        .then( result => {
            res.render("movies/edit-movie", {result})
        })
        .catch((error) => {
            console.log("Error connecting to DB", error)
        });
});

// router.get("/movies/:id/edit", (req, res) => {
//     const id = req.params.id;

//     let celebrities;

//     Celebrity.find()
//         .then(result => {
//             celebrities = result;
//             return Movie.findById(id)
//         })
//         .then( result => {

//             celebrities.forEach(celebrityElement => {
//                 result.cast.forEach (castElement => {
//                     if(castElement.toString() == celebrityElement.id.toString()) {
//                     celebrityElement.selected = true;
//                 }
//                 console.log(celebrities)
//                 })
//             })

//             //res.render("movies/edit-movie", {result})
//         })
//         .catch((error) => {
//             console.log("Error connecting to DB", error)
//         });
// })

router.post("/movies/:id/edit", (req, res) => {
    const id = req.params.id;
    Movie.findByIdAndUpdate(id, req.body)
    .then(result => res.redirect("/movies"))
    .catch((error) => {
        console.log("Error deleting movie from DB", error)
    });
})



module.exports = router;