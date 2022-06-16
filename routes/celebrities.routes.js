const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
/* 
/celebrities/create	GET	Show a form to create a celebrity
/celebrities/create	POST	Send the data from the form to this route to create the celebrity and save it to the database
 */

//Create celebrities
router.get("/create", (req, res, next) => {
  //recuerda que como estás ya en celebrities route, ya no necesitas el prefijo celebrities aquí
  res.render("celebrities/new-celebrity");
});

router.post("/create", (req, res, next) => {
  const celebrity = req.body;
  Celebrity.create(celebrity)
    .then((celebrity) => {
      console.log("create success", celebrity);
      res.render("index");
    })
    .catch((err) => {
      console.log("error creating celebrity", err);
      next();
    });
});

//Read celebrities
router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log("found these celebrities", celebrities);
      res.render("celebrities/celebrities", {celebrities});
    })
    .catch((error) => {
      console.log("error reading celebrities", error);
      next();
    });
});






//delete celebrities
router.get('/delete/:id', (req, res,next) => {
    Celebrity.findByIdAndDelete(req.params.id)
    .then(()=>{
        console.log("celebrity deleted")
        res.render("index");
    })
    .catch((err)=>{
        console.log("error deleting",err)
        next()
    })
})

module.exports = router;
