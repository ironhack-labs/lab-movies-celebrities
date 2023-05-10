// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

// Require Celebrity Model 
const Celebrity = require('../models/Celebrity.model.js');

// GET: Show a form to create a celebrity
router.get('/celebrities/create', (req,res)=>{
    res.render('celebrities/new-celebrity.hbs');
});

// POST: Send the data from the form to this route to create the celebrity and save it to the database
router.post('/celebrities/create', (req,res)=>{ 

   // destructuring the req.body object
   const {name, occupation, catchPhrase} = req.body;

   async function createCelebrityInDb(){
    try{
        // Creating the Celebrity in Db
        let createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('/celebrities');
    }
    catch(error){
        console.log(error);
    }
   }
   createCelebrityInDb();
});


// GET: Show all celebrities
router.get('/celebrities', (req,res)=>{
    async function findAllCelebritiesFromDb(){
      try{
          // Find all the celebrities inside the collection 
          let allCelebritiesFromDb = await Celebrity.find();
  
          // Render all celebrities from DB with hbs view
          res.render('celebrities/celebrities.hbs', {celebrities: allCelebritiesFromDb});
      }
      catch(error){
          console.log(error);
      }
    }
    findAllCelebritiesFromDb();
  });





module.exports = router;