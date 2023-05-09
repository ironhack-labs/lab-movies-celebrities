// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model.js')
// all your routes here



//Iteration #3

router.get('/celebrities/create', (req,res)=>{
    res.render('celebrities/new-celebrity.hbs')
})

router.post('/celebrities/create', (req,res)=>{
    const {name,occupation,catchPhrase} = req.body;
    async function createNewCelebinDB(){
        try{
            const newCelebrity = await Celebrity.create({name,occupation,catchPhrase});
            console.log('Created new Celeb',newCelebrity);
            res.redirect('/celebrities')
        }
        catch(error){
            console.log(error); 
            res.render('celebrities/new-celebrity.hbs')}
    }
    createNewCelebinDB();

});

//Iteration #4
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