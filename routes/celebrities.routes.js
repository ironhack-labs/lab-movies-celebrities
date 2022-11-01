const router = require("express").Router();
const Celebrity = require('../models/Celebrity.model');

router.get("/celebrities", async (req, res, next) => {
    try { 
        const celebrityList = await Celebrity.find();
        res.render("celebrities/celebrities", {celebrityList});
        console.log(celebrityList);   
     
}   catch (error) {
    console.log(error);
    next(error);
}
})

router.get('/celebrity-create', (req, res, next) => res.render ('celebrities/new-celebrity'));
router.post('/celebrity-create', async (req, res, next) => {
    try {
    const {name, occupation, catchPhrase} = req.body;
    
    const newCelebrity = await Celebrity.create({name, occupation, catchPhrase});

    res.redirect('/celebrities');

} catch (error) {
    console.log(error);
    res.redirect('/new-celebrity')
    /* next(error); */
}
})




module.exports = router;