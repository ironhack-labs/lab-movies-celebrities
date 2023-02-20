// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model.js");
// all your routes here

<<<<<<< HEAD
router.get('/create-celebrity', (req, res, next) =>{
    res.render('celebrities/new-celebrity')
})

router.post("/create-celebrity", (req, res, next) =>{
    const { name, occupation, catchPhrase } = req.body
    Celebrity.create({name, occupation, catchPhrase})
    .then(() => res.redirect('/celebrities'))
    .catch((error) => next(error))
})

router.get("/celebrities/", (req, res, next) => {
    Celebrity.find()
    .then(allCelebrities => {
        res.render("../views/celebrities/celebrities.hbs", {celebrity: allCelebrities})
    })
   
})
=======
router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  //create new celebrity inside the database
>>>>>>> e7c62d983b383bac70f302b9f7650e2f29e56ea5

  Celebrity.create({ name, occupation, catchPhrase })
  /*.then((celebrityDB) => console.log(`New celebrity created ${celebrityDB.name}`)*/
      .then(() => res.redirect("/celebrities"))
      .catch((error) => next(error))
});

router.get("/celebrities/", (req, res, next) => {
  res.render("celebrities/celebrities", {Celebrity});
});

module.exports = router;
