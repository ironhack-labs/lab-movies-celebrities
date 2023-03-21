// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require ("../models/Celebrity.model");

router.get("/celebrities",(req,res,next)=> {

Celebrity.find()
.then((celebrityArr) => {

    const data = {
        celebrity: celebrityArr
    };

    res.render("celebrities/celebrities", data);
  })
  .catch((error) => {
    console.log("Error getting drones from DB");
  });
});



router.get("/celebrities/create", (req,res,next)=> {
    res.render("celebrities/new-celebrity");
})

router.post ("/celebrities/create", (req,res,next)=> {
    console.log(req.body);
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrityFromDB)=> {
        res.redirect("/celebrities");
    })
    .catch((error) => {
        console.log("Error");
        res.redirect("/celebrities/new-celebrity")
      });
})




module.exports = router;
