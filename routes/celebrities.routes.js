const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model")


router.get('/celebrities/create', (req, res) => res.render('celebrities/new-celebrity'));

router.post('/celebrities/create', async (req, res) =>{
    try {
        const {name, occupation, catchPhrase} = req.body
        await Celebrity.create({name, occupation, catchPhrase})

        res.redirect('/celebrities')

    } catch (error) {
        res.render('celebrities/new-celebrity')
    }
});

router.get('/celebrities', async (req, res, next) =>{
    try {
        let celebrities = await Celebrity.find()
        res.render('celebrities/celebrities.hbs', {celebrities})
    } catch (error) {
        next(error)
    }


});

router.get("/celebrities/:id", async (req, res, next) => {
    try {
      const {id} = req.params;
      const celeb = await Celebrity.findById(id);
      res.render("celebrities/celebrities-details", {celeb})
    } catch (error) {
      next(error);
    }
  });

router.post("/celebrities/:id/delete", async (req, res, next) =>{
    try {
        const {id} = req.params
        await Celebrity.findByIdAndRemove(id)
        res.redirect('/celebrities') 
    } catch (error) {
        next(error)
    }
    
});

router.get("/celebrities/:id/edit", async (req, res, next) =>{
    try {
        const {id} = req.params
        
        const edit = await Celebrity.findById(id)
        res.render("celebrities/edit-celebrities", {edit})
    } catch (error) {
        next(error)
    }
});

router.post("/celebrities/:id/edit", async (req, res, next) => {
    try {
        const {id} = req.params
        const {name, occupation, catchPhrase} = req.body

        await Celebrity.findByIdAndUpdate(id, {name, occupation, catchPhrase})

        res.redirect(`/celebrities/${id}`)
    } catch (error) {
        next(error)
    }
});









module.exports = router;