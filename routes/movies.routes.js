// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movies.model");


// all your routes here

router.get('/movies', (req, res, next) => res.render
('movies/movies'));

router.post('/movies/create', async (req, res, next) =>{
    try {
    const {title, genre, plot} = req.body;
    const createdMovie = await Movie.create({title, genre,plot});
    
    res.redirect(`/movies/create/${createdMovie._id}`);

} catch (error){
      console.log(error);
      next(error);
    }
});


router.get('/movie-details/:id', async (req, res, next) =>{
    try 
    {
    const {id} = req.params;

    const users = await User.find();

    //double/nested populate
    const book = await Book.findById(id).populate("reviews author").populate({
      path: "reviews",
      populate: {
        path: "title",
        model: "genre",
      },
    });

   console.log(book);
    res.render('/movie-details', {book,users});
    } catch (error){
      console.log(error);
      next(error);
    }
});



module.exports = router;

