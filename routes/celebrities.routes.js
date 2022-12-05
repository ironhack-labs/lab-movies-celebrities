const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/", (req,res,next)=>{

})

router.post("", (req,res,next) => {
    const { name, catchPhrase, occupation} = req.body
    Celebrity.create({
        name,
        catchPhrase,
        occupation
    }).then(celebrityCreated =>{
        console.log("Celebrity created", celebrityCreated);
        res.redirect("/")
    }).catch(error =>{
        if(error instanceof mongoose.Error.ValidationError){
            //                                            
            return res.status(400).render("celebrities/new-celebrity", { errorMessage: error.message})
        }
        if(error.code === 11000){
            return res.status(400).render("celebrities/celebrities", { errorMessage: "Error message"})
        }
        //500 --> lo mandamos a la pagina del error
        return next(error)
    })
})

module.exports = router;