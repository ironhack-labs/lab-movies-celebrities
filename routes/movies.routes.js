const CelebrityModel = require("../models/Celebrity.model");
const MovieModel = require("../models/Movie.model");

// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

//route to show form to create movie
router.get('/movies/create', (req, res, next)=> {
   
    CelebrityModel.find({ }, 'name')   //PARAMETER-SYNTAX stimmte hier nicht!!!!!
    .then((celebrities) => {

        res.render('movies/new-movie', {celebrities})  //hier wie bei celeb.routes.js wieder params!!

        //make sure you pass all the celebrities from your database 
        //so your users can choose which ones are in the cast of the movie
        // you're just creating (hint: You will have to use select multiple tag)

    })

  .catch((err)=> {

    next(err)
  })
     
 



  //mit It #6 weitermachen

})








//route to send data from form. SAME URL, diff method
router.post('/movies/create', (req, res, next)=> {

 let {title, genre, plot, cast}= req.body       

 MovieModel.create(req.body)

 .then(()=> {

    res.redirect('/movies')

 })

.catch(()=> {

    res.send('Failed to create movie')
})

})




router.get('/movies', (req, res, next)=> {



 MovieModel.find()

 .then(()=> {
    

  req.query = {
  

  }

    res.render('movies/movies.hbs', req.query)
 })


})






module.exports = router;
