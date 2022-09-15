const router = require("express").Router();
const Celeb = require('../models/Celebrity.model');


//--------- this has to be `/`  and can't just be anything. this is refering to the "routes" folder
//         |
router.get(`/celebs`, (req, res, next) => {
   console.log(res.render(`./celebrities/celebrities`));
  

  });


  
  router.get(`/celebs/create`, (req, res) =>{
   res.render(`celebrities/new-celebrity.hbs`)
   
   })

   router.post('/celebs/create', (req, res, next) => {
      console.log({entireFormInput: req.body});// req.body is the thing catching the data sent from the html form method POST
      const {name, occupation, catchphrase} = req.body;
      // adds new book to database from the form
      Celeb.create({name, occupation, catchphrase})
          // .then(newBookForDb => console.log(`New book created: ${newBookForDb.title}`))
          .then(() => {
              res.redirect(`/celebs`)
          })
          .catch(error => {
              next(error)
          });
  
    });
  

// // Create Route
// router.post('/create', (req, res, next) => {
//    console.log(req.body);
//    const addCeleb = {
//        name: req.body.name,
//        occupation: req.body.occupation,
//        catchphrase: req.body.catchphrase
//    }
   
//    // console.log({body: req.body, animalToCreate});

//    Celeb.create(addCeleb)
//    .then(newCeleb => {
//        // console.log({newlyCreatedAnimal})

//        // *** res.redirect has have the arguement being the same as you would pass to an a tag in the href.
//        res.redirect(`/celebrities/celebrities/${newCeleb._id}`);
//    }).catch(err => {
//        console.log({err});
//    })
// })




// router.get('/', (req, res, next) => {
//    console.log({query: req.query});

//    Celeb.find()
//    .then((celebsFromDB) => {
//        console.log({animalsFromDb});

//        data = {
//            celeb: celebsFromDB
//        }

//        // *** When rendering a file. Remember views is static so start from the views as if it was the root folder, and path to the file.hbs you want to display. (No relativ path needed just start with file or folder name)
//        res.render('/celebrities/celebrities', data);
//        // *** when padding data to a page. remember it must be in object format.
//    })
//    .catch(err => {
//        console.log({err});
//    })
// })




  module.exports = router;