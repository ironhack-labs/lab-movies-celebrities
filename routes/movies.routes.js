const router = require("express").Router();
const Movie = require("../models/Movie.model")
const Celebrity = require("../models/Celebrity.model")

// all your routes here

router.get("/movies/create", (req,res,next)=>{
    Celebrity.find()
    .then((data)=>{
        res.render("movies/new-movie", {celebs: data})
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.post("/movies/create", (req,res,next)=>{
    let {title, genre, plot } = req.body;
    let newMovie = {title,genre,plot,cast:[req.body.select]}
    Movie.create(newMovie)
    .then(()=>{
        res.redirect("/")
    })
    .catch((err)=>{
        res.render("movies/new-movie")
    })
})

router.get("/movies",(req,res,next)=>{
    Movie.find()
    .then((data)=>{
        res.render("movies/movies",{movies: data})
    })
})

router.post("/movies/edit/:id", (req,res,next)=>{
    let {title, genre, plot } = req.body;
    let id = req.params.id
    let editedMovie = {title,genre,plot,cast:[req.body.select]}
    Movie.findOneAndUpdate({_id: id}, editedMovie, {new: true})
    .then((data)=>{
        res.redirect("/movies")
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get("/movie/:id",(req,res,next)=>{
    let id = req.params.id;
    Movie.findById(id)
    .populate("cast")
    .then((data)=>{
        res.render("movies/movie-details", {movie: data})
    })
})

router.post("/movies/:id/delete", (req,res,next)=>{
let id = req.params.id;
Movie.findByIdAndRemove(id)
.then((data)=>{
    res.redirect("/")
})
.catch((err)=>{
    console.log(err)
})
})

router.get("/movies/:id/edit", (req,res,next)=>{
    let id = req.params.id
    let obj = {}
    Movie.findById(id)
    .populate("cast")
    .then((data)=>{
        obj = {...obj, movie:data}
        Celebrity.find()
        .then((data)=>{
            obj={...obj, celebs: data}
            res.render("movies/edit-movie", obj)
        })
        .catch((err)=>{
            console.log(err)
        })
    })
    .catch((err)=>{
        console.log(err)
    })


})



module.exports = router;