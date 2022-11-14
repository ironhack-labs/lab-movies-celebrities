
const router = require("express").Router();

const Celebrity=require('../models/Celebrity.model')

router.get("/celebrities", (req, res, next) => {
  Celebrity
    .find()
    .then(celebrities => {
      console.log(celebrities)
      res.render("celebrities/celebrities", { celebrities });
      
  })
 .catch(err=>console.log(err))
});



router.get("/new-celebrity", (req, res, next) => {

    res.render("celebrities/new-celebrity")
})

router.post("/new-celebrity", (req, res, next) => {
  const { name, occupation,  catchPhrase } = req.body
  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(celebrity => { res.redirect('/celebrities') })
  .catch(err=>console.log(err))
}
)


module.exports = router;

// router.get('/drones/create', (req, res, next) => {
//   res.render('drones/create-form')
// });

// router.post('/drones/create', (req, res, next) => {
//   const { name, propellers, maxSpeed } = req.body
//   Drone
//     .create({ name, propellers, maxSpeed })
//     .then(drone => { res.redirect('/drones') })
//     .catch(err => console.log(err))
  
// });