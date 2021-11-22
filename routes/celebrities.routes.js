// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get('/celebrities/create', (req, res, next) => {
    res.render("celebrities/new-celebrity")
  });

  router.post('/celebrities/create', (req, res, next) => {
    const {name, occupation, catchPhrase} = req.body
    celebrityModel.create({name, occupation, catchPhrase})
    .then((celebrities) => {
      console.log(celebrities)
      res.redirect("/celebrities")
    })
    .catch((err) => {
      console.log(err)
      res.render("/celebrities/new-celebrity")
    })
  });
module.exports = router;