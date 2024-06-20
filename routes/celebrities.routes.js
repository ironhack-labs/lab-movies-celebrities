// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("./celebrities.routes");


 router.get ("/celbrities/create", (req, res, next)=>{
   
    res.render("celebrities/new-celebrity")
 });
 
 router.post ("/celebrities/create", (req, res,next)=>{
    console.log(req.body)
    const newCeleb = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase
    }
    Celebrity.create(newCeleb)
    .then((newCeleb)=>{
        res.redirect("/celebrities")
    })
    .catch( e =>{
        console.log("error adding new celebrity", e)
        res.render("celebrities/new-celbrity")
        next(e);
    })
    router.get("routes/celebrities.routes.js", (req,res,next)=> {
        Celebrity.find()
        .then((listOfCeleFromDB)=> {
            (res.render("celebrities/celebrities", {celebritiesArr: listOfCeleFromDB}))
        })
        .catch( e => next(e))   

        })
        (res.render("celebrities/celebrities.hbs"))

    });





// all your routes here
//celebrities.create(newCeleb)

module.exports = router;