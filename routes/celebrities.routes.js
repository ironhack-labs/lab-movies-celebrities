const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

// all your routes here
router.get("/celebrities/create", (req, res) => {
  console.log(res.render);
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res) => {
  console.log(req.body);
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({
    name: name,
    occupation: occupation,
    catchPhrase: catchPhrase,
  })
    .then(() => {
      res.redirect("/celebrities");
    })

    .catch((err) => {
      console.log("Error while creating the celebrities:", err);
      res.redirect("/celebrities/new-celebrity");
    });
});

router.get("/celebrities", (req, res) => {
    console.log(res.render);
    Celebrity.find()
    .then((result) => {
        console.log(result) 
        res.render("celebrities/celebrities", {result}); 
    })
    .catch((err) => {
        console.log("Celebrities are on the red carpet - that's why you see an error", err)
    })
    
  });



module.exports = router;
