// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

router.get("/celebrities/create", (req, res) => {
    res.render("celebrities/new-celebrity")
  })
  
  router.post("/celebrities/create", (req, res) => {
    const { name, ocupation, catchPhrase} = req.body;

    Celebrity.create({ name, ocupation, catchPhrase})
      
      .then(celebrity => res.render("celebrities/new-celebrity", celebrity))
      .catch(err => console.log(err))

    })

    
      
router.get("/celebrities", (req, res) => {
      
    Celebrity.find()
        .then(allTheCelebrities => res.render("celebrities/celebrities", { allTheCelebrities }))
        .catch(err => console.log(err))
      
      });
      

module.exports = router;
