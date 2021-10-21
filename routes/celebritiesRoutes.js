// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/celebrities", (req, res, next)=>{
    Celebrity.find()
    .then((celebrityFromDB)=>{
        console.log(celebrityFromDB)
        const data = {
            celArray:celebrityFromDB
        }
        
        res.render("celebrities/celebrities", data);
    })
    .catch((error)=>{
        console.log("oooops, an error occurs", error)
        next(error)
            });
})

router.get("/celebrities/create", (req, res, next)=>{
    Celebrity.find()
    
    .then(() =>{
        res.render("celebrities/new-celebrity")
    })
    .catch((error)=>{
console.log("Error creating new celebrities", error);
next(error)
    });
});

router.post("/celebrities/create", (req, res, next)=>{
    const {name, occupation, catchPhrase} = req.body;
    Celebrity.create({name, occupation, catchPhrase})
    .then(()=>{
        res.redirect("/celebrities");
    })
    .catch((error)=>{
        res.render("celebrities/new-celebrity")
        next(error)
            });
})




module.exports = router;