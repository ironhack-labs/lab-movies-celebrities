// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here
// GET route to retrieve and display all the celebrities
router.get('/celebrities', (req,res)=>{
    async function findAllCelebritiesFromDb(){
      try{
          // Find all the celebrities inside the collection 
          let allCelebritiesFromDb = await Celebrity.find();
  
          // Feedback regarding to found celebrities
          console.log('Retrieved celebrities from DB:', allCelebritiesFromDb);
  
          // Render all celebrities from DB with hbs view
          res.render('celebrities/celebrities.hbs', {celebrities: allCelebritiesFromDb});
      }
      catch(error){
          console.log(error);
      }
    }
    findAllCelebritiesFromDb();
  });





// GET route to display the form
router.get('/celebrities/create', (req,res)=>{
    res.render('celebrities/new-celebrity.hbs');
});

// POST route to save a new celebrity to the database in the celebritys collection
router.post('/celebrities/create', (req,res)=>{
   //console.log(req.body); 

   // destructuring the req.body object
   const {name, occupation, catchPhrase} = req.body;

   async function createCelebrityInDb(){
    try{
        // Creating the Celebrity in Db
        let createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
        //Feedback regarding the Celebrity Created in Db
        console.log(`New celebrity created: ${createdCelebrity.name} `);
        res.redirect('/celebrities');
    }
    catch(error){
        console.log(error);
    }
   }

   createCelebrityInDb();
});





//////////////// 
/* router.get("/celeb", async (req, res, next) => {
  await Celebrity.create({
    name: "teste",
    occupation: "none",
    catchPhrase: "none",
  });
  res.render("index");
}); */
////////////////

module.exports = router;
