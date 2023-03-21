// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here

// CREATE - display form
router.get("/celebrities/create", (req, res, next) => {
   
    res.render("celebrities/new-celebrity")
    // .then(
    // )
    // .catch(e => {
    //     console.log("error getting authors from DB", e);
    //     next(e);
    //   });
})

// CREATE - process form
router.post("/celebrities/create",(req,res,next)=>{

    const celebDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }

    Celebrity.create(celebDetails)
        .then(celebFromDB => {
            res.redirect("/celebrities");
        })
        .catch(e => {
            console.log("error creating new book", e);
            next(e);
          });
})


module.exports = router;