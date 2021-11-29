// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

//Models

const Celebrity = require("../models/Celebrity.model.js")

// all your routes here


router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
  });

router.get("/", async (req, res, next) => {
    try{
      const celebrities = await Celebrity.find();
      res.render("./celebrities/celebrities", { celebrities });
    } catch (err) {
      res.render("../movies/not-found", {error:err.message});
      }
    });

router.post("/create", async (req, res, next) => {
  const {name, occupation, catchPhrase} = req.body; 
  try{
    const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase})
    res.redirect("/celebrities")
    console.log (createdCelebrity)

  } catch(err){
    res.render("./movies/not-found", {error:err.message});
    }
  });
  

module.exports = router;

