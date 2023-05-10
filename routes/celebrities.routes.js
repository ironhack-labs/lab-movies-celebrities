// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get('/celebrities/create', (req,res) => {
    res.render('celebrities/new-celebrity')
})

router.post('/celebrities/create', (req,res) => {
    let {name, occupation, catchPhrase} = req.body;
    async function createCelebrity() {
      try {
        let createdCeleb = await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('celebrities');
      } catch (err) {
        console.error(err);
        res.redirect('create')
      }
    }
  createCelebrity();
})

router.get("/celebrities/celebrities", (req,res)=>{
    async function findAllCelebs(){
      try{
          let allCelebs = await Celebrity.find();
          res.render("celebrities/celebrities", {response: allCelebs});
      }
      catch(error){
          console.log(error);
      }
    }
    findAllCelebs();
})

module.exports = router;