// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model.js');

// all your routes here

// GET ROUTE
router.get('/celebrities/create', (req,res)=>{
    res.render('celebrities/new-celebrity.hbs');
});

// POST route to save a new book to the database in the books collection
router.post('/celebrities/create', (req,res)=>{
   //console.log(req.body); 

   // destructuring the req.body object
   const {name, occupation, catchPhrase} = req.body;

   async function createCelebrityInDb(){
    try{
        // Creating the Celebrity in Db
        let createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
        //Feedback regarding the Celebrity Created in Db
        ///console.log(`New celebrity created: ${createdCelebrity.name} `);
        res.redirect('/celebrities');
    }
    catch(error){
        console.log(error);
        res.redirect('/celebrities/new-celebrity.hbs');
    }
   }

   createCelebrityInDb();
});


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