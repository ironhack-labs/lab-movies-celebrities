const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model")



//formulario para crear a las celebrities
router.get("/create", (req, res)=> res.render('celebrities/new-celebrity'))
router.post("/create", (req, res)=> {
  const { name, occupation, catchPhrase } = req.body
  Celebrity
    .create({ name, occupation, catchPhrase })
    .then(theCelebrity => {
       res.redirect(`/celebrities`)})
    .catch(err => console.log(err))

})

//listado de celebrities
router.get("/", (req, res)=> {

  Celebrity
    .find()
    // .select('name')
    .then(celebrities => res.render('./celebrities/celebrities', { celebrities }))
    .catch(err => console.log(err))
})



module.exports = router;