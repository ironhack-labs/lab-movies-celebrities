const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/celebrities", (req, res) => {
  async function showCelebrities() {
    try {
      let celebrities = Celebrity.find();
      res.render("celebrities/celebrities.hbs", 
        celebrities
      );
    } catch (error) {
      console.log(error);
    }
  }
  showCelebrities();
});

router.get('/celebrities/create',(req,res)=>{
  res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create',(req,res)=>{
  const {name,occupation,catchPhrase} = req.body;
  async function createACelebrity(){
      try{
          let createdCelebrity = await Celebrity.create({name,occupation,catchPhrase});
          res.redirect('/celebrities');
      }
      catch(error){
        console.log(error);
          res.render('celebrities/create',{ celebrity: createdCelebrity });
      }
  }
  createACelebrity();
})


module.exports = router;
