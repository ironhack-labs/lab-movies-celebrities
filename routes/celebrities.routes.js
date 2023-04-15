

const router = require("express").Router();

const CelebrityModel = require("../models/Celebrity.model");



router.get('/create', async (req, res) => {
    const celebFromDb = await CelebrityModel.find();
    res.render("celebrities/new-celebrity")
});

//send result from form to db
router.post('/create', async (req, res) => {
console.log("sending form to db")
try{
    await CelebrityModel.create(req.body);
    console.log("redirecting to list")
    res.redirect('/celebrities/celebrities-list');
}

catch(err){
    console.log('something went wrong', err);
res.redirect('/create');
}
});

router
.route('/celebrities-list')

.get( (req, res) => {
    CelebrityModel.find()
    .then(celebsList => {
    console.log("trying to render list", celebsList)
    res.render("celebrities/celebrities-list", {celebs: celebsList})
})
.catch(error =>{
    console.log("could not render list", error);
    next(error);
});
});





module.exports = router;