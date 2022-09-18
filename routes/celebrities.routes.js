const router = require("express").Router();
const Celeb = require('../models/Celebrity.model');


//--------- this has to be `/`  and can't just be anything. this is refering to the "routes" folder
//         |
router.get(`/celebs`, (req, res, next) => {
    // console.log(res.render(`./celebrities/celebrities`));
    Celeb.find()
    .then(allCelebsDb => {
        console.log("Got all celebs", allCelebsDb);
 
        res.render('./celebrities/celebrities', { celebs: allCelebsDb});
    })
    .catch(error => {
        console.log(`Error on celeb get`, error);
 
        next(error);
    })
 
 
   });


  
  router.get(`/celebs/create`, (req, res) =>{
   res.render(`celebrities/new-celebrity.hbs`)
   
   })

   router.post('/celebs/create', (req, res, next) => {
      console.log({entireFormInput: req.body});// req.body is the thing catching the data sent from the html form method POST
      const {name, occupation, catchphrase, _id} = req.body;
      // adds new book to database from the form
      Celeb.create({name, occupation, catchphrase, _id})
          // .then(newBookForDb => console.log(`New book created: ${newBookForDb.title}`))
          .then(() => {
              res.redirect(`/celebs`)
          })
          .catch(error => {
              next(error)
          });
  
    });
  




  module.exports = router;