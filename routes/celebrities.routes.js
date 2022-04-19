const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity");
});
  
router.post("/celebrities/create", async (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    try{
        const newCeleb = await Celebrity.create({name,occupation,catchPhrase});
    }catch(err){
        res.render("celebrities/new-celebrity");
        console.log('Failed to create new celebrity ', err);
    }
    res.redirect("/celebrities/");
});

router.get("/celebrities", async (req, res, next) => {
    try{
        const celebList = await Celebrity.find();
        res.render("celebrities/celebrities", { celebs : celebList });
    }catch(err){
        console.log('Failed to load celebrity list ',err);
        res.status(500).json({message: err.message});
    }

});

router.post("/celebrities/:id/delete", async (req,res,next) => {
    const id = req.params.id;
    try{
        const deleteCeleb = await Celebrity.findByIdAndRemove( id );
        res.redirect("/celebrities");
    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get("/celebrities/:id/edit", async (req,res,next) => {
    const id = req.params.id;
    try{
        const celebDetails = await Celebrity.findById( id )
        res.render("celebrities/edit-celebrity", { celeb : celebDetails });
    }catch(err){
        console.log('Failed to load movie list ',err);
        res.status(500).json({message: err.message});
    }
});

router.post("/celebrities/:id", async (req,res,next) => {
    const {name, occupation, catchPhrase} = req.body    
    const id = req.params.id;
    try{
        const updateCeleb = await Celebrity.findByIdAndUpdate(id,{name,occupation,catchPhrase});
    }catch(err){
        console.log(err);
    }
    res.redirect(`/celebrities/${id}`);
});

router.get("/celebrities/:id", async (req,res,next) => {
    const id = req.params.id;
    try{
        const celebDetails = await Celebrity.findById( id );
        res.render("celebrities/celebrity-details", { celeb : celebDetails });
    }catch(err){
        console.log('Failed to load movie list ',err);
        res.status(500).json({message: err.message});
    }
});



module.exports = router;
