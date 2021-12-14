// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const celebritiesRoute = require("express").Router();
const { Mongoose } = require("mongoose");
const { router } = require("../app");
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/celebrities/create", (req,res,next) =>{
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", async(req,res,render) =>{

    const {name, occupation, catchPhrase, ...rest} = req.body
    try{
        const celebrity = await User.create({name, occupation, catchPhrase, ...rest})
        res.redirect("routes/celebrities.routes.js")
    }catch(error){
        console.log("error", error)
        if(error instanceof mongoose.Error.ValidationError){
            res.render("celebrities/new-celebrity")
        }else{
            res.render("celebrities/celebrities")
        }
        
    }
   
})

module.exports = celebritiesRoute;