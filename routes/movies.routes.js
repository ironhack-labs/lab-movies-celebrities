// código de inicio en las rutas / celebrities.routes.js y las rutas / movies.routes.js 
const express = require('express');
const router = require("express").Router();

//0.Requerimos el modelo Celebrity.model.js movie.model.jsy para que este accesible aqui
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

//0.1 Buscamos todas las celebrities
router.get("/create", (req, res, next) => {
	Celebrity.find()
		.then((celebrities) => {
			res.render("movies/new-movie", { celebrities });
		})
		.catch((err) =>
			console.log("Error displaying the form to create a movie.", err),
		);
});

//1.Creamos con GET la vista del formulario para agregar nuevas celebrities
router.get('/create', (req, res, next)=>{
    res.render('movies/new-movie');
});

//2.Creamos con POST el endpoint para crear nuevas movie.
router.post("/create", (req, res, next)=>{ 
      
    const {title, genre, plot, cast} = req.body;//Con req.body recuperamos los datos de la plantilla Celebrities
    //2.1 Con el Metodo CREATE pasamos los datos de nuestra plantilla para crear una entrada en la BBDD. 
    //console.log('entra aqui')
    Movie.create({title, genre, plot, cast})
        .then(()=>{
            console.log("se ha creado la movie© BIEN!!!",req.body) 
            res.redirect("movies")
        })
        .catch( (error) => {
            console.log("Error adding new movie to DDBB", error);
            res.render('movies/new-movie');
        });
    
})

//3. Hacemos un render de la vista movies.hbs
router.get("/movies", (req, res, next) => {
	Movie.find()
        .then((movies) => {
			res.render("movies/movies", {
				movies: movies,
			});
		})
		.catch(err => console.log(err));
})

//4.Con FindId buscamos la movie y creamoss la vista en movie-details.hbs 
router.get("/:id", (req, res, next) => {
	Movie.findById(req.params.id)
		.populate("cast")
		.then((movieDetail) => {
			res.render("movies/movie-details", { movieDetail });
		})
		.catch((err) => console.log(err));
});

//5. Con findByIdAndRemove buscamos y eliminamos la movie
router.post("/:id/delete", (req, res) => {
	Movie.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect("/movies/movies");
		})
		.catch((err) => console.log("Error deleting the movie: ", err));
});


 

module.exports = router;