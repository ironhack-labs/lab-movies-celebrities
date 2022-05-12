// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const async = require("hbs/lib/async");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// display all celebrities
router.get("/", async (req, res, next) => {
  try {
    const allCelebrities = await Celebrity.find();
    res.render("celebrities/celebrities", {allCelebrities});
    //console.log({allCelebrities})
  } catch (error) {
    next(error);
  }
});

// create new celebrity (get/post)

router.get('/create',  (req, res, next) => {
  try {
      //const celebrities = await Celebrity.find();
      res.render('celebrities/new-celebrity');
      
  } catch (error) {
      next(error);
  }
});
router.post("/create", async (req, res, next) => {
  try {
    // get info from form through req.body
    const { name, occupation, catchPhrase } = req.body;
    // create instance of celebrity model
    await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    res.redirect("/celebrities");
  } catch (error) {
    res.redirect("/celebrities/new-celebrity");
    next(error);
  }
});

//Edit celebrities details (get & post)

router.get("/:id/edit", async(req,res,next)=>{
  try {
    const { id } = req.params;
    const celebrityDetail = await Celebrity.findById(id);
    //console.log(celebrityDetail);
    res.render("celebrities/celebrities-edit", {celebrityDetail})
  } catch (error) {
    next(error);
  }
});

router.post("/:id/edit", async(req, res, next) =>{
  try {
    const { id } = req.params;
    const {name, occupation, catchPhrase} = req.body;
    await Celebrity.findByIdAndUpdate(id, {name, occupation, catchPhrase}, {new: true});
    res.redirect(`/celebrities/${id}`);
  } catch (error) {
    next(error);
    res.render("celebrities/celebritites-details");
  }
});

//Delete celebrity

router.post("/:id/delete", async(req, res, next) =>{
  try {
    const { id } = req.params;
    await Celebrity.findByIdAndDelete(id);
    res.redirect('/celebrities');
  } catch (error) {
    next(error);
  }
});
//See  celebrity details
router.get("/:id", async(req,res,next)=>{
  try {
    const { id } = req.params;
    const celebrityDetail = await Celebrity.findById(id);
    //console.log(celebrityDetail);
    res.render("celebrities/celebrities-details", celebrityDetail)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
