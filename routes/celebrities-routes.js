// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrities = require('./../models/Celebrity.model')

/* GET celebrities page */
router.get("/celebrities/create", (req, res, next) => res.render("./../views/celebrities/new-celebrities"))

// Books list
// router.get('/libros/listado', (req, res) => {

//     Book
//         .find()
//         .select('title')
//         .then(books => res.render('books/books-list', { books }))
//         .catch(err => console.log(err))
// })


module.exports = router;
/* remember to link these two new files to either app.js or routes/index.js so your server has access to them.
-Steps we will follow in this iteration:
-In the routes file (routes/celebrities.routes.js) create the following GET route: /celebrities/create
-In that route we have to render the celebrities/new-celebrity view
-In that view file:

Create the /celebrities/create POST route in routes/celebrities.routes.js.
In that route we have to create an instance of the Celebrity model (don't forget, we should get all the info from the form through req.body)
If there is an error, render the celebrities/new-celebrity view so the user can try again and
If there is no error, redirect to the page with the list of celebrities. This route will be created in the next iteration /celebrities
In the views/index.hbs view file:
Add a link that goes to the page you just created with the form to create a new celebrity.
 */