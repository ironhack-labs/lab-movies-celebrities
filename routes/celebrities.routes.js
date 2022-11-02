// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here


router.get('/celebrities/create', (req, res, next) => {
    
    res.render('celebrities/new-celebrity')
});

router.post('/celebrities/create', async (req, res, next) => {
    try {
      const {name, ocuppation, catchPhrase} = req.body;
  
      const createdCelebrity = await Celebrity.create({name, ocuppation, catchPhrase})
      res.render('celebrities/celebrities')
  } catch (err) {
      console.log(err);
      next(err)
      

  }
});

router.get('/celebrities', async (req, res, next) => {
    try {
        const celebrities = await Celebrity.find();
    
        res.render('celebrities/celebrities', [ celebrities ]);
    } catch (error) {
        console.log(error);
        next(error);
    }
});


module.exports = router;