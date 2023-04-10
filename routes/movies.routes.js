const express=require('express')     //defined express seperately 
const router = express.Router();     

const movieModel=require("../models/movie.model")



router.get('/new-movie',async(req,res)=>{
    try{
    await movieModel.create(req.body)
    //console.log("celebrity created ")
    res.redirect('/movies/movies')
    }
    catch(err){
        
        res.render('movies/new-movie');
    }

})

router.post('/movies',async(req,res,next)=>{
    try{
        const movies=await movieModel.find()
        res.render('movies/movies',{movies: movies}) 
    }
    catch(err){
console.log('Error getting movies', err)
    }
})

module.exports = router;