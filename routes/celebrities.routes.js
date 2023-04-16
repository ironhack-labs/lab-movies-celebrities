const CelebrityModel = require("../models/Celebrity.model")
const router = require("express").Router();

router.get('/create', (req, res)=> {
      
        res.render("celebrities/new-celebrity")
    });


router.post('/create', async (req,res) => {
    const celebritiyCreateInfo = JSON.parse(JSON.stringify(req.body));

    const {name, occupation, catchPhrase} = celebritiyCreateInfo
    
    if(name.length === 0 || occupation.length === 0 || catchPhrase.length === 0 ) { 
        console.log('Not enough information to create a Celebtrity on DB: ', req.body, name);
        res.render("celebrities/new-celebrity");
        } else {
            const newCelebrity = await CelebrityModel.create(req.body);
            // console.log("new celebrity create ", newCelebrity)
            res.redirect('/celebrities/celebrities');    
        }
 
});

router.get('/celebrities', async (req,res) => {
    try {
        const allCelebrities = await CelebrityModel.find();
        res.render("celebrities/celebrities", {allCelebrities});

    } catch {(err) =>
    console.log("Error to acess the celebrities on DB: ", err);
    };
})
    


module.exports = router;