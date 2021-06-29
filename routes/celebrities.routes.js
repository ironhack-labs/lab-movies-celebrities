const app = require("../app");
const CelebrityModel = require("../models/Celebrity.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();



// all your routes here

//1. Create routes to SHOW FORM TO ADD CELEBS

router.get('/celebrities/create', (req, res, next)=>{

 res.render('celebrities/new-celebrity')
 //next('failed to show form')

})

//CONVENTION: SAME URL AS APP.get, only diff method!!!
router.post('/celebrities/create', (req,res,next) =>{


const {name, occupation, catchPhrase}= req.body

CelebrityModel.create({name, occupation, catchPhrase})
.then(()=> {

 res.redirect('/celebrities')

})
.catch((err)=> {
   next(err)  //das hinzugefügt!!! auf Rat  //das hier als 2nd param hinzugefügt, destructured req.body
   res.render('celebrities/new-celebrity', {name, occupation, catchPhrase})   //mit oder ohne slash vor celebrities???
})

})




//2. create route to show celebs
router.get('/celebrities', (req, res, next)=> {

    CelebrityModel.find()
               .then((celebrities)=> {
               res.render('celebrities/celebrities', {celebrities})  //was kommt in zweites param?
               .catch((err)=> {
                   next(err)//'If there's an error, catch it"
                })
                   

    })
})























module.exports = router;
