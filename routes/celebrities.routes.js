const Celebrity = require("../models/Celebrity.model");
const router = require("express").Router();


//Create a new Celebrity
router.get("/celebrities/create", (req, res, next) => 
res.render ("celebrities/new-celebrity"));

router.post("/celebrities/create", async (req, res, next) => {
  try {
    const {name, occupation, catchPhrase} = req.body;
    let createdCelebrity = await Celebrity.create({name, occupation, catchPhrase})
    res.redirect('/celebrities/create');
} catch (error) {
    console.log(error);
    next(error);
}
});

//List the Celebrities
router.get("/celebrities", async (req, res, next) => {
    try{
    const allCelebrities = await Celebrity.find(); 
    res.render('celebrities/celebrities.hbs',  { allCelebrities });
} catch(error) {
    console.log(error);
    next(); 
}
});

module.exports = router;


