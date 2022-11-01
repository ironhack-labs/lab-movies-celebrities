const Movie = require("../models/Movies.model");
const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

router.get('/celebrities/create', (req, res, next) => res.render
('celebrities/new-celebrity'));

router.post('/celebrities/create', async (req, res, next) =>{
    try {
    const {name, occupation, catchPhrase} = req.body;
    const createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
    
    res.redirect(`/celebrities/create/${createdCelebrity._id}`);

} catch (error){
      console.log(error);
      next(error);
    }
});


router.get("/celebrities", async (req, res, next) => {
    try {
       const celebrities = await Celebrity.findById();
       res.render('celebrities/celebrities',celebrities);
     } catch (error){
       console.log(error);
       next(error);
     }
   
   });
 
   



















module.exports = router;