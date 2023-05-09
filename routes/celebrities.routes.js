// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js")


// all your routes here
router.get('/celebrities/create', (req,res)=>{
    res.render('celebrities/new-celebrity.hbs');
});

// POST route to save a new celebrity to the database
router.post('/celebrities/create', (req,res)=>{

   // destructuring the req.body object
   const {name, occupation, catchPhrase} = req.body;

   async function createCelebrityInDb(){
    try{
        // Creating the celebrity in Db
        let createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
        
        res.redirect('/celebrities');
    }
    catch(error){
        res.redirect("/new-celebrity")
    }
   }

   createCelebrityInDb();
});

// GET route to retrieve and display all the celebs
router.get('/celebrities', (req,res)=>{
    async function findAllCelebritiesFromDb(){
      try{
          // Find all the celebs inside the collection 
          let allCelebritiesFromDb = await Celebrity.find();

  
          // Render all celebs from DB with hbs view
          res.render('celebrities/celebrities.hbs', {celebrities: allCelebritiesFromDb});
      }
      catch(error){
          console.log(error);
      }
    }
    findAllCelebritiesFromDb();
  });
module.exports = router;