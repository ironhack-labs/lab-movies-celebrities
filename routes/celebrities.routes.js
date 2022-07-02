// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")
const Movie = require("../models/Movie.model")


//CREATE

router.get("/celebrities/create", (req, res, next) => {
    
    res.render("celebrities/new-celebrity");
})

router.post("/celebrities/create", (req, res, next) => {
    //Creating an instance of the Celebrity model
    const {...user } = req.body;
    
    Celebrity.create({user})
    .then( () => {
        res.redirect("/celebrities");
    })
    .catch( err => {
        console.log("Error creating celebrity", err);
        res.render("celebrities/new-celebrity");
        next()
    })
})


//READ

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then(celebrities => {
            res.render("celebrities/celebrities", {celebrities});
        })
        .catch(err => {
            console.log("Error: ", err);
            next(err);
        })
})

router.get("/celebrities/:id", (req, res, next) => {
    const {id} = req.params;
    Celebrity.findById(id)

        .then(celebrity => {
            res.render("celebrities/celebrity-details", {celebrity});
        })
        .catch(err => {
            console.log("Error to show celebrity's details ", err);
            next(err);
        })
})
//Delete 
router.post('/delete/:id', (req, res, next)=>{
    const {id} = req.params
    Celebrity.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/celebrities')
    })
    .catch(err =>{
        console.log('error in delete', err);
        next()
    })
})
//Update
router.get('/celebrities/:id/edit', (req, res, next)=>{
    Celebrity.findById(req.params.id)
    .then(celebrityEdited =>{
        res.render('celebrities/edit-celebrity', {celebrity: celebrityEdited})
    })
    .catch(err =>{
        console.log('Error in editing celebrity', err);
        next()
    })
})

router.post('/celebrities/:id/edit', (req, res, next)=>{
    const {id } = req.params
    const {...Edited} = req.body

    Celebrity.findByIdAndUpdate(id, Edited)
    .then(()=>{ res.redirect(`/celebrities/${id}`)

    })
    .catch(err => next(err))

})



module.exports = router;