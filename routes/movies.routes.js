const router = require("express").Router();

// all your routes here

router.get('/movies/create', (req,res)=>{
    res.render('movies/new-movie.hbs');
});

router.post('/movies/create', (req,res)=>{
    console.log(req.body); 
    const {title, genre, plot, cast} = req.body;
 
    async function createMovieInDb(){
     try{
         let createdMovie = await Movie.create({title, genre, plot, cast});
         console.log(New movie created: ${createdMovie.title} );
         res.redirect('/movies');
     }
     catch(error){
        res.render('movies/new-movie.hbs');
        console.log(error);
     }
    }
    createMovieInDb();
 });

module.exports = router;