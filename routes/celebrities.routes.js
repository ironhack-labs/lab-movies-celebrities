const router = require("express").Router();

//Models
const Celebrity = require('../models/Celebrity.model.js')

// all your routes here


//Ruta base a Celebrities
// router.get("/", (req, res) => {
//     res.render("../views/celebrities/celebrities.hbs");
// });

//Ruta a Celebrities para iteraction 4 -
router.get("/", async (req,res) =>{
  try {
      const celebrities = await Celebrity.find({});
    res.render("../views/celebrities/celebrities.hbs", {celebrities});
  } catch (err) {
    console.log("err", err);
  }
});



/* GET create new celebrity page */ //renderizan todas a partir de /celebrities
router.get("/create", (req, res) => {
    res.render("../views/celebrities/new-celebrity.hbs");
  });

/* POST create new celebrity page */
router.post("/create", async (req, res)=>{
const {name, occupation, catchPhrase} = req.body;
try{
    const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase})
    res.render("./celebrities/celebrities.hbs", {justCreatedCelebrity: createdCelebrity.name})
    }catch(err){
    res.render("./celebrities/new-celebrity", { errorCreation: err})
    }

})

module.exports = router;