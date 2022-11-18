const router = require('express').Router();
const celebrity = require('../models/Celebrity.model')

// GET route to retrieve and display all the books
router.get('/celebrities', (req, res) => {
    //1. Traer los datos de la base de datos
    //Los metodos usados con mongoose nos dan una Promise
    celebrity.find()
    .then((lasCelebrities)=>{
        console.log("fam",lasCelebrities);
     //2. UNA VEZ que tenemos los datos mandalos al templete
     res.render('celebrities/celebrities', {celebrity: lasCelebrities});      
    })
    .catch(err=>console.log(err));
});

//Create route to celebrities/create
router.get("/celebrities/create", (req,res)=>res.render("celebrities/new-celebrity"));

//Guardar una nueva celebridad 
router.post("/celebrities/create", async (req, res, next) => {
    try{
    const { name, occupation, catchPhrase } = req.body;
    const newCelebrity = await celebrity.create({ 
        name, 
        occupation, 
        catchPhrase
    })
    res.redirect("/celebrities")
    }catch(err){
        console.log(err);
    }
  });


module.exports = router;