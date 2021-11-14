
// iteration 1 > Routes 
// PASO 1 CREAR LAS RUTAS CELEBRITIES Y MOVIES Y LINKEARLOS AL APP.JS

const router = require("express").Router();
const Celebrity = require('./../models/Celebrity.model')
// all your routes here

// Iteration #4: Listing Our Celebrities

// 1.Create the / celebrities GET route 
// in routes / celebrities.routes.js.
router.get('/', (req, res, next) => {
    
//  2.   In the route:
// // Use find() method on the Celebrity model
// //  to retrieve all the celebrities
    Celebrity.find()
        
    
    //2. If everything is okay, render the celebrities / celebrities.hbs view 
    // and pass the array of celebrities into the view as a variable
    .then((celebrities) => {
            res.render('celebrities/celebrities', { celebrities })
        })
        
        // 2.If there's an error, catch it
        .catch((err) => console.error(err))
})


// iteration 3 > 1.  create the following GET route: /celebrities/create
router.get('/create', (req, res, next) => {
    // 2.  render the celebrities/new-celebrity view
    res.render('celebrities/new-celebrity')
})

// iteration 3. 4.Create the / celebrities / 
// create POST route in routes / celebrities.routes.js


router.post('/create', (req, res, next) => {
//   3.5 In that route we have to create an instance of the Celebrity 
//    model(don't forget, we should get all the info from the form through req.body)
    
   const { name, occupation, catchPhrase } = req.body

    Celebrity.create(req.body)
        
        .then(() => res.redirect('/celebrities'))
        // If there is no error, redirect to the page with the list of celebrities.
        // This route will be created in the next iteration / celebrities


        .catch(() =>
            res.render('celebrities/new-celebrity', {
                errorMessage: 'Error creating a new celebrtity',
                // If there is an error, render 
                // the celebrities/ new- celebrity view so the user 
                // can try again and
            })
        )
})


module.exports = router;