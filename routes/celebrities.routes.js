// código de inicio en las rutas / celebrities.routes.js y las rutas / movies.routes.js 
const express = require('express');
const router = require("express").Router();

//0.Requerimos el modelo Celebrity.model.js para que este accesible aqui
const Celebrity = require("../models/Celebrity.model");

//1.Creamos con GET la vista del formulario para agregar nuevas celebrities
router.get('/create', (req, res, next)=>{
    res.render('celebrities/new-celebrity')
});
  
//2.Creamos con POST el endpoint para crear nuevas celebrities.
router.post("/create", (req, res, next)=>{ 
    
    const {name, occupation, catchPhrase} = req.body;//Con req.body recuperamos los datos de la plantilla Celebrities
    //2.1 Con el Metodo CREATE pasamos los datos de nuestra plantilla para crear una entrada en la BBDD. 
    //console.log('entra aqui')
    Celebrity.create({name, occupation, catchPhrase})
        .then(()=>{
            console.log('se ha creado la celebritie BIEN!!!', req.body) 
            res.redirect("celebrities")
        })
        .catch( (error) => {
            console.log('Error adding new Celebritie to DDBB', error);
            res.render("celebrities/new-celebrity");
        });   
})
 

//3. Hacemos un render de la vista celebrities.hbs
router.get('/celebrities', (req, res, next) => {
	Celebrity.find()
        .then((celebrities) => {
			res.render('celebrities/celebrities', {
				celebrities: celebrities,
			});
		})
		.catch(err => console.log(err));
})

//4.Con FindId buscamos la Celebrity y creamos la vista en celebrity-details.hbs 
router.get("/:id", (req, res, next) => {
	Celebrity.findById(req.params.id)
     
		//.populate("cast")
		.then((celebrityDetail) => {
			res.render("celebrities/celebrity-details", { celebrityDetail });
		})
		.catch((err) => console.log(err));
});

//5. Con findByIdAndRemove buscamos y eliminamos la Celebrity
router.post("/:id/delete", (req, res) => {
	Celebrity.findByIdAndRemove(req.params.id)
		.then(() => {
			res.redirect("/celebrities/celebrities");
		})
		.catch((err) => console.log("Error deleting the movie: ", err));
});

module.exports = router;