// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

//Require celebrities
const Celebrity = require('../models/Celebrity.model');

router.get("/celebrities/create", async (req, res, next) => {
const celebritiesFromDB = await Celebrity.find().populate('celebrity').sort({
    title: 1
}); //sorts books alphabetically
    res.render("celebrities/new-celebrity", {celebritiesFromDB});
});


router.post('/celebrities/create', async (req, res) => {
    try {
        const {
            name,
            occupation,
            catchPhrase
        } = req.body; //names need to match the names on the form
        //accessing the info we place on the browser
        await Celebrity.create({
            name,
            occupation,
            catchPhrase,
        });
        res.redirect('/celebrities');

    } catch(e){
res.redirect('/celebrities/new-celebrity');
    }
    
    
});




router.get("/celebrities", async (req, res, next) => {
try{
const celebritiesFromDB = await Celebrity.find()
res.render("celebrities/celebrities", {
    celebritiesFromDB
});

} catch(e){
    console.log(e);
}

    
});



router.get('/celebrities/:celebrityId', async (req, res) => {
    try {
        const celebrityDetail = await Celebrity.findById(req.params.celebrityId);
        res.render('celebrities/celebrity-details', {
            celebrityDetail
        });
    } catch (e) {
        console.log(e);
    }
});


//Delete
router.post('/celebrities/:celebrityId/delete', async (req, res) => {
    try {
        await Celebrity.findByIdAndDelete(req.params.celebrityId);
        res.redirect('/celebrities');
    } catch (e) {
        console.log(e);
    }

});




//Edit
//Update
//Render edit book form with the book we are editing
router.get('/celebrities/:celebrityId/edit', async (req, res) => {
    const celebrityToEdit = await Celebrity.findById(req.params.celebrityId);
   
    res.render('celebrities/edit-celebrity', {
        celebrityToEdit
    });
});

router.post('/celebrities/:celebrityId/edit', async (req, res) => {
    const {
        name,
        occupation,
        catchPhrase
    } = req.body;
    await Celebrity.findByIdAndUpdate(req.params.celebrityId, {
        name,
        occupation,
        catchPhrase,
    });
    res.redirect('/celebrities');
});










module.exports = router;