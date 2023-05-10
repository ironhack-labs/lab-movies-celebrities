const router = require("express").Router()


const Celebrity = require('../models/Celebrity.model.js'); 



// use Get to show a form to create a celebrity
router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new.celebrity.hbs");
  });

// Send the data from the form to this route to create the celebrity and save it to the database

router.post('/celebrities/create', (req,res, next)=>{
   
   const {name, occupation, catchPhrase} = req.body;

   async function createCelebrityInDb(){
    try{
        // Creating a celebrity in Db 
        let createCelebrityInDb = await Celebrity.create({name, occupation, catchPhrase});
        
        console.log(`New celebrity created: ${createCelebrityInDb.string} `);
        res.redirect('/celebrities');
    }
    catch(error){
        console.log(error);
    }
   }

   createCelebrityInDb();
});

// use find (method in the celebrity mode to retrieve all the celebrities)



  router.get('/celebrities', (req,res)=>{
    async function getAllCelebs (){
        try{
            const findAllCelebs = await Celebrity.find();
            console.log(findAllCelebs)
            res.render('celebrities/celebrities.hbs',{celebrities: findAllCelebs})
        }
        catch(error){console.log(error)}
    } 
    getAllCelebs();
    
})


module.exports = router;


