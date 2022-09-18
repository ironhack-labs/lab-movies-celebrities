    router.get('/movies/:id/edit', (req, res, next) => {
        Movie.findById(req.params.id).populate('cast')
        .then(theMovie=>{
            console.log({TESTTTTTT: theMovie})



            
        
        Celeb.find()
        .then(allCelebsDb => {
            console.log("Got all celebs", allCelebsDb);
     
            res.render('movies/edit-movie', {movie: theMovie})
        })
        })

     
        .catch(err => {console.log({err})})
    })
    