const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model")


router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
            .then(x => {
              console.log(x)
              res.render("celebrities/celebrities", {celebrity : x})
              })
              .catch(err => next(err))
})

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity")
})


  router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase} = req.body

    Celebrity.create({ name, occupation, catchPhrase})
		.then(createdCelebrity => {
			console.log(createdCelebrity)
		
			res.redirect("/celebrities")
		
		})
		.catch(err => {
      next(err)
    res.render("celebrities/new-celebrity")})
  });  




module.exports = router;