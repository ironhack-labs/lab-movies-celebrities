const router = require("express").Router();

const { route } = require("express/lib/application");

const Movies = require('../models/Movie.model');

const Celebrities = require('../models/Celebrity.model')


//SHOW
router.get('/create', (req,res,next)=>{
    Celebrities.find()
    .then(allCelebrities =>{
        res.render('movies/new-movie', {allCelebrities})})
    .catch(error => {
        console.log('Ha salido un error al crear los datos: ', error)
        next()
    })
})

//CREATE
router.post('/create',(req,res,next)=>{
    const {...allMovies} = req.body //Cuando son mas de un valor es necesario los tres puntos o definir cada valor para ser mostrado posteriormente!
    console.log('que es data:', allMovies)
    Movies.create(allMovies)
    .then(() => {
        res.redirect('/movies/movies') //Necesario crear un nuevo GET para que se visualice, de lo contrario sale error en el redirect.
        console.log('SI LLEGO')
    })
    .catch(error => {
        console.log('Ha salido un error al crear los datos: ', error)
        next(error)
    })
})

router.get('/movies', (req,res,next)=>{
    console.log('Estoy en movies');
    Movies.find()
    .then(allMovies =>{
        console.log('Que es allMovies:',{allMovies})
        res.render('movies/movies',{allMovies})
    })
    .catch(error => {
        console.log('Ha salido un error al crear los datos: ', error)
        next()
    })
})

//SHOW DETAILS
router.get('/:id',(req,res,next)=>{
    const {id} = req.params
    console.log("Se ha movido a details")
    console.log('que es id: ',id)
    Movies.findById(id)
    .populate('cast') //Para ingresar a datos mas adentro de la DB
    .then(movie =>{
    res.render('movies/movies-details',movie)
    })
    .catch(error => {
        console.log('Ha salido un error al mostrar el details: ', error)
        next()
    })
})

//DELETE
router.post('/:id/delete',(req,res,next)=>{
    const {id} = req.params
    console.log('Llegaste al delete', id)
    Movies.findByIdAndDelete(id)
    .then(()=>{
        res.redirect('/movies/movies') //Lo atrapa el GET de la linea 36
    })
    .catch(error => {
        console.log('Ha salido un error al mostrar el details: ', error)
        next(error)
    })
})

//UPDATE
router.get('/:id/edit',(req,res,next)=>{
    const {id} = req.params
    console.log('Llegaste a update')
    Movies.findById(id)
    .populate('cast')
    .then(movie =>{
        Celebrities.find()
        .then((celebritie) =>{
            console.log('que es movie:',movie) //si pongo {movie}}, puedo utilizar en el archivo hbs los datos de movie como: {{movie.title}},{{movie.genre}}...
            console.log('que es celebritie: ',celebritie);
            console.log('que son ambos: ',{movie,celebritie});
            res.render('movies/edit-movie',{movie,celebritie}) //Importante que datos queden asi para ser visualizados en el hbs
        })
        .catch(error => {
            console.log('Ha salido un error al mostrar el edit-movie: ', error)
            next(error)
        })
    })
    .catch(error => {
        console.log('Ha salido un error en get id/edit: ', error)
        next(error)
    })
})


router.post('/:id/edit',(req,res,next)=>{
    const {id} = req.params
    const {title,genre,plot,cast} = req.body
    Movies.findByIdAndUpdate(id,{title,genre,plot,cast},{ new: true })
    .then(() =>{
        /* console.log('que es cast:',cast)
        Celebrities.find('cast') */
        res.redirect('/movies/movies')
    })
    .catch(error => {
        console.log('Ha salido un error al actualizar: ', error)
        next(error)
    })
})



module.exports = router;