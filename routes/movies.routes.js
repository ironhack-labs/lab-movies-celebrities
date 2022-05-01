
// starter code in both routes/celebrities.routes.js and routes/movies.routes.js

// Importar Router() de express para crear la ruta y el modelo/scheme de las peliculas
const router = require("express").Router();

// Importa el modelo de las celebridades y lo guarda en la variable Movie
const Movie = require("../models/Movie.model");

// Importa el modelo de las celebridades y lo guarda en la variable Celebrity
// Esto con el fin de buscar y mostrar a las celebridades guardadas al crear la película y elegirlas en lugar de escribirlas
// O para poner a las celebridades de una pelicula ya creada cuando vayamos a ver sus detalles o actualizarla (populate())
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// Ruta GET para mostrar la lista de peliculas (la ruta es /movies)
router.get("/movies", (req, res) => {
    Movie.find()
        .then(peliculas => {
            // Muestra el HBS de movies con la info encontrada en el modelo (se guarda en la variable peliculas)
            res.render("movies/movies", { peliculas })
        })
        .catch(console.log)
})

// Ruta GET para mostrar el formulario de crear/añadir peliculas al usuario
router.get("/movies/create", (req, res) => {
    // Busca a las celebridades guardadas en el DB (Mongo Compass) para mostrarlas en el formulario
    Celebrity.find()
        .then(celebridades => {
            // Muestra el HBS de new-movie y la info de celebridades encontrada en el DB (se guarda en la variable celebridades)
            res.render("movies/new-movie", { celebridades }) // <= la info de celebridades se pone como un objeto para poderla mostrar en el formulario ya que viene como un array de origen
        })
        .catch(console.log)
})

// Ruta POST para obtener la info del formulario enviada por el usuario
router.post("/movies/create", (req, res) => {

    // Se destructura el body para obtener el valor de cada atributo (title, genre, plot, cast) y guardarla en respectivas variables
    const { title, genre, plot, cast } = req.body;

    // Crear un registro de la película en el DB usando las variables de arriba y usando el Schema de Movie
    Movie.create({ title, genre, plot, cast })
        .then(nuevaPelicula => {
            console.log(nuevaPelicula)
            // despues de crear la pelicula, redirecciona a la pagina de la misma con sus los detalles
            //                      Interpolamos la ruta con el ID de la pelicula usando la variable nuevaPelicula creada en el .then()
            res.redirect(`/movies/${nuevaPelicula._id.toString()}`) // <= convertimos la variable nuevaPelicula en un objeto y ponemos ._id para entrar y usar el valor del ID
        })
        .catch(() => {
            // en caso de algun error, reenvía el formulario de crear pelicula
            res.render("/movies/create")
        })
})

// Ruta GET para ver los detalles de una pelicula
router.get("/movies/:id", (req, res) => {
    
    // Busca la pelicula por ID el cual se obtiene con req.params
    Movie.findById(req.params.id)
        // Se muestra el listado de celebridades usando .populate() para rellenar el campo con los actores encontrados en el atributo cast (un array en este caso)
        .populate("cast")
        .then(datosPelicula => {
            // El resultado se guarda en la variable datosPelicula con la siguiente estructura
            // { title: "", genre: "", plot: "", cast: ["id1","id2"] }

            // Se muestra el HBS de movies details con la info de datosPelicula
            res.render("movies/movie-details", datosPelicula)
        })
        .catch(console.log)
})

// Ruta POST para eliminar una pelicula
router.post("/movies/:idPelicula/delete", (req, res) => {
    // Busca y elimina una pelcula por ID sacando el ID de req.params
    Movie.findByIdAndDelete(req.params.idPelicula)
        .then(() => {
            // Despues de borrar redirecciona a lista de peliculas
            res.redirect("/movies");
        })
        .catch(console.log)
})

// Ruta GET para enviar formulario y editar una pelicula
router.get("/movies/:id/edit", (req, res) => {
    const actoresReales = [];

    Movie.findById(req.params.id)
        .populate("cast")
        .then(pelicula => {
            // console.log(pelicula)
            Celebrity.find()
                .then(celebridades => {
                    celebridades.forEach(celebridad => {
                        actoresReales.push({ celebridad, existe: false })
                    })

                    pelicula.cast.forEach(cast => {
                        actoresReales.forEach((cel, i) => {
                            if (cel.celebridad.id === cast.id) {
                                console.log("yep")
                                actoresReales[i].existe = true
                            }
                        })
                    })
                    res.render("movies/edit-movie", { pelicula, celebridades, actoresReales })
                })
                .catch(console.log)
        })
        .catch(console.log)
})


// Ruta POST para actualizar la pelicula con los datos recibidos del formulario
router.post("/movies/:id/edit", (req, res, next) => {
    

    Movie.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedMovie => {
        res.redirect("/movies")
    })
    .catch(() => {
        // en caso de algun error, reenvía al home
        res.redirect("/")
    })
    
})



// Se exporta la ruta en la variable router
module.exports = router;