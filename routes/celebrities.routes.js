// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');


router.get(
  "/create",
  (req, res)=>{
  res.render("celebrities/new-celebrity")
})

router.get(
  "/:id",
  (req, res)=>{
    Celebrity.findById(req.params.id).
    then((celebrity)=>{
      res.render("celebrities/celebrity-detail", celebrity)
    })
  })

router.get("/:id/delete",(req, res)=>{
  Celebrity.findByIdAndDelete(req.params.id)
  .then(deletedCelebrity => res.redirect("/celebrities"))
  .catch(error=> console.log(error))
})

// router.route("/:id/edit")
// .get((req, res)=>{
//   Celebrity.findById(req.params.id)
//   .then(celebrity=>res.render("celebrity-edit", celebrity))
  
// })
// .post((req, res)=>{
//   const {name, surname, nationality, bio} = req.body
//   Celebrity.findByIdAndUpdate(
//     req.params.id,
//     {name, surname, nationality, bio}
//   )
//   .then(updateCelebrity => res.redirect(`/celebritys/${req.params.id}`))
//   .catch(error => console.log(error))
// })

router.get(
  '/',
  (req, res) => {
  Celebrity.find()
  .then(allCelebrities => {
    res.render('celebrities/celebrities', {allCelebrities})})
});

router.post(
  "/",
  (req, res)=>{
  const {name, occupation, catchPhrase} = req.body
  Celebrity.create({name, occupation, catchPhrase})
  .then(newCelebrity => res.redirect("/celebrities/"))
})

module.exports = router;