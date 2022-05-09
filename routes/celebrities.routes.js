const router = require('express').Router();


const Celebrity = require ('../models/Celebrity.model');




// create new celebrity (get/post)
router.get('/create',  (req, res, next) => {
    try {
        //const celebrities = await Celebrity.find();
        res.render('celebrities/new-celebrity');
        
    } catch (error) {
        next(error);
    }
});

router.post('/create', async (req, res, next)=>{
    try {
        const{name, occupation, catchPhrase } =req.body;
        await Celebrity.create({name, occupation, catchPhrase});
        res.redirect('/celebrities')
    } catch (error) {
        next(error)
    }
});

//display all celebrities
router.get('/', async(req, res, next) =>{
    try {
        const celebrities = await Celebrity.find();
        res.render('celebrities/celebrities', {celebrities});
        
    } catch (error) {
        next(error)
    }
})



module.exports = router;