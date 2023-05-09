const Celebrity = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here








// Adding New Celebrities 

router.get('/celebrities/create', (req, res)=>{

    res.render('celebrities/new-celebrity.hbs');


})

router.post(`/celebrities/create`,  (req, res)=>{

    let {name, occupation, catchPhrase} =req.body;

    async function addNewCelebrity(){

     try{   
    const newCelebrity = await Celebrity.create({
        name,
        occupation, 
        catchPhrase,})
    res.redirect('/celebrities');
}catch(error){
    console.error(error);
     res.render('celebrities/new-celebrity.hbs');
}};

addNewCelebrity();

})

// List all Celebrities
router.get('/celebrities', (req, res)=>{

    async function listAllCelebrities(){
    
    try{
        /* await Celebrity.create({name:'gully', occupation: 'engineer', catchPhrase:"yes"}) */
        let allCelebrities = await Celebrity.find();
        res.render('celebrities/celebrities.hbs', {celebs: allCelebrities});
    
    
    }catch(error){
        console.error(error);
    }
    
    
    
    };
    listAllCelebrities();
    
    });





module.exports = router;