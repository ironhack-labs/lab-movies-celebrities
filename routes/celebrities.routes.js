// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//Models

const Celebrity = require("../models/Celebrity.model.js")

// all your routes here

router.get("/celebrities", (req, res, next) => {
  res.render("celebrities/celebrities");
  });

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
  });

router.post("/celebrities/create", async (req, res, next) => {
  const {name, occupation, catchPhrase} = req.body; 
  try{
    const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase})
    res.render("./celebrities/celebrities",{justCreatedCelebrity:createdCelebrity.name})
    // console.log (createdCelebrity)

  } catch(err){
    res.render("./celebrities/new-celebrity", {error:err.message});
    }
  });
  
  
module.exports = router;

