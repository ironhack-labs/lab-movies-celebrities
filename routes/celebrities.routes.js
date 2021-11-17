const router = require("express").Router();

//Models
const Celebrity = require('../models/Celebrity.model.js')

// all your routes here

router.get("/", (req, res) => {
    res.render("../views/celebrities/celebrities.hbs");
  });

//intento de iteraction 4 -------------------------------------------------------------------
//   router.get("/", async (req, res) => {
//     const celebrity = await Celebrity.findById(req.params.id).populate('name')
//     const {name} = celebrity
//     res.render("../views/celebrities/celebrities.hbs", {name});
//   });



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