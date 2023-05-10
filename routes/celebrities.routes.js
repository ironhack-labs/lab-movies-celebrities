const router = require("express").Router();

//Require celebrity model
const Celebrity = require('../models/Celebrity.model.js');


//Get route to display the form
router.get('/celebrities/create', (req, res)=>{
    res.render('celebrities/new-celebrity.hbs');
});

router.post('/celebrities/create', (req, res)=>{
    const{name, occupation, catchPhrase} = req.body;
    async function createCelebrity(){
        try{
            let createdCelebrity = await Celebrity.create({name, occupation, catchPhrase});
            res.redirect('/celebrities');
        }
        catch(error){
            console.log(error);
        }
    }
    createCelebrity();
});

  //Create the /celebrities GET route to display ALL THE CELEBRITIES
router.get("/celebrities", (req, res) => {
  async function findAllCelebrities() {
    try {
      let allCelebrities = await Celebrity.find();
      res.render("celebrities/celebrities.hbs", { celebrities: allCelebrities });
    } catch (error) {
      console.log(error);
    }
  }
  findAllCelebrities();
});



module.exports = router;