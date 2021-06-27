const router = require("express").Router();

const Movie = require('../models/Movie.model')
const Celebrity = require('../models/Celebrity.model')

// all localhost:3000/movies routes here:
router.get("/", (req, res, next) => {
    // what if the list if empty?
        Movie
        .find({})
        .populate('cast') //not necessary
        .then( movies => {
            // res.send(movies)
            res.render('movies/movies', {movies})
        })
        .catch( err => console.log(err))
    });

router.get("/create", (req, res, next) => {
    Celebrity
    .find({})
    .then( celebrities => {
        res.render('movies/new-movie', {celebrities})
    }
    )
    
});

    
router.post("/create", (req, res, next) => {
    const movie = req.body
    const {title, image, genre, plot, cast} = movie
    const validationConst = title && genre && image && plot 

    if(!validationConst || (typeof cast === "string")){
        res.render('movies/new-movie', {errorMessage: `All fields are mandatory. Refresh page.`})
        return
    }   

    Movie
        .findOne({title})
        .then( foundMovie => {
            if(foundMovie){
                res.render('movies/new-movie', {errorMessage: `${movie} already registered.`})
                return
            }
        })

    Movie
        .create( movie)
        // .then( () => res.send(movie))
        .then( () => res.redirect('/movies'))
        .catch(err => console.log(err))
});

router.get('/:id', (req, res, next) => {
    // res.send("Success!!!")
    const {id} = req.params
    Movie
        .findById(id)
        .populate('cast')
        .then(movie => {
            res.render('movies/movie-details', movie)
        })
})

router.post('/:id/delete', (req, res, next) => {
    const {id} = req.params
    Movie   
        .findByIdAndRemove(id)
        .then(deleted => {
            res.redirect('/movies')
        })
        .catch(err => res.send("Error. Can't delete, can't programm."))
})


router.get("/:id/edit", async (req, res, next) => {
    const {id} = req.params
    const celebs = await Celebrity.find({})

    Movie
        .findById(id)
        .populate('cast')
        // .then( movie => res.send({movie} ))    
        .then( movie => {
            console.log(celebs.length)

            movie.oldCastList = movie.cast
            console.log(movie.oldCastList.length)
            movie.cast = celebs
            console.log(movie.cast.length)
            movie.cast.forEach( actor => {
                actor.selected = movie.oldCastList.some(oldActor => oldActor.name == actor.name)
                console.log(actor.name, actor.selected)
            })
            // res.send( movie.oldCastList )
            // res.send( {...celebs, ...movie} )
            res.render('movies/edit-movie', movie )

        }   )
});


// router.get("/:id/edit",  (req, res, next) => {
//     const {id} = req.params

//     Movie
//         .findById(id)
//         .populate('cast')
//         // .then( movie => res.send({movie} ))    
//         .then( movie => res.render('movies/edit-movie', movie ))    
// });

router.post('/:id/edit', (req, res, next) => {
    const {id} = req.params
    const {title, genre, image, plot, cast} = req.body
    Movie
        .findByIdAndUpdate(id, {title, genre, image, plot, cast})
        .then( () => res.redirect('/movies'))
        .catch( (err) => res.send(`Get a grip. You've got errors: ${err}`))
        
})

// router.get("/movie-details", (req, res, next) => {
//     res.render('movies/movie-details')
// });



module.exports = router;