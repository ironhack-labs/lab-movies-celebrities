// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity=require("../models/Celebrity.model")
const Movie=require("../models/Movie.model")
// all your routes here

router.get("/create",(req,res,next)=>{

    Celebrity.find()
    .then(data=>{
        // console.log(data)
        res.render("../views/movies/new-movie",{celebrities:data})

    })

})

router.post("/create",(req,res,next)=>{
    const {title,genre,plot,cast}=req.body
    // console.log(req.body)
    Movie.create({ title,genre, plot,cast })
    .then((createdMovie) => {
    //   console.log(createdMovie);
      res.redirect("/movies");
    })
    .catch(() => {
      res.render("new-movie");
    });


})

router.get("/", (req, res, next) => {

    Movie.find()
    .then(data=>{
        // console.log(data)
        res.render("../views/movies/movies",{movies:data})
    })
    .catch(err=>{
        console.log(err)
    })
  });

router.get("/:id",(req,res,next)=>{
    const ids=req.params.id
    Movie.findById(ids)
    .populate("cast")
    .then(data=>{
        // console.log(data)
        res.render("../views/movies/movie-details",{details:data})
    })
})


router.post("/movies/:id/delete",(req,res,next)=>{

    console.log(req.body)
    console.log(req.params)
})

module.exports = router;