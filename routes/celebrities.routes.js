

const router = require("express").Router();
const CelebrityModel = require("../models/Celebrity.model");



router.get('/create', async (req, res) => {
    const celebFromDb = await CelebrityModel.find();
    res.render("celebrities/new-celebrity")
});

//send result from form to db
router.post('/create', async (req, res) => {
console.log("here we are")
try{
    await CelebrityModel.create(req.body);
    res.redirect('/celebrities');
}

catch(err){
    console.log('something went wrong', err);
res.redirect('/create');
}
});



module.exports = router;