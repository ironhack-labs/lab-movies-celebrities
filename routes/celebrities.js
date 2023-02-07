const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")

router.get("/celebrities/create", (req, res, next) => {

        res.render("celebrities/new-celebrity")
 
  })


  router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body
   

    Celebrity.create({name, occupation, catchPhrase})
      .then(createdCelebrities => {
        console.log(createdCelebrities)
        res.redirect(`/celebrities/${createdCelebrity._id}`)
    
  })
  .catch(err => next(err))

})

module.exports = router;
