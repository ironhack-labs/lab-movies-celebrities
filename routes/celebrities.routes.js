// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity=require("../models/Celebrity.model")
// all your routes here

router.get("/create", (req, res, next) => {
  res.render("../views/celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((createdCelebrity) => {
    //   console.log(createdCelebrity);
      res.redirect("/celebrities");
    })
    .catch(() => {
      res.render("new-celebrity");
    });
});
router.get("/", (req, res, next) => {

    Celebrity.find()
    .then(data=>{
        // console.log(data)
        res.render("../views/celebrities/celebrities",{celebrities:data})
    })
    .catch(err=>{
        console.log(err)
    })

    // res.render("celebrities/celebrities.hbs");
  });

module.exports = router;
