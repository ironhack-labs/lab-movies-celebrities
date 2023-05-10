const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js');


// all your routes here

router.get('/celebrities/create', (req,res)=>{
    res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create', (req,res)=>{
    console.log(req.body); 
    const {name, occupation, catchPhrase} = req.body;
 
    async function createCelebrityInDb(){
     try{
         let createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
         console.log(`New celeb created: ${createdCelebrity.name} `);
         res.redirect('/celebrities');
     }
     catch(error){
        res.render('celebrities/new-celebrity.hbs');
        console.log(error);
     }
    }
    createCelebrityInDb();
 });

router.get('/celebrities', (req,res)=>{
    async function findAllCelebritiesFromDb(){
      try{
          // Find all the celebrities inside the collection 
          let allCelebritiesFromDb = await Celebrity.find();

          // Feedback regarding to found celebrities
          // console.log('Retrieved celebrities from DB:', allBooksFromDb);

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
