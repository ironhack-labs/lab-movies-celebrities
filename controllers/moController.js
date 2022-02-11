const Movies = require("../models/Movie.model")
const { findOneAndRemove, findByIdAndUpdate } = require("../models/Movie.model")
const Cele = require("../models/Celebrity.model")

exports.getMovies = async (req, res) => {

	try {
	
		const foundMovies = await Movies.find({}).populate("cast")
		
		res.render("movies/movies", {
			dataM: foundMovies
			
		})

	} catch (error) {
		
		console.log(error)

	}	

}

exports.createMovies = async (req, res) => {

	const allCelebrities = await Cele.find({})
    
    
    res.render("movies/new-movie", {
        celebrities: allCelebrities
    })

}

exports.createMoviesForm = async (req, res) => {

	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL SERVIDOR
	const { title, genre, plot, cast  } = req.body
	// const title = req.body.title
	
	// 2. CREAR EL DOCUMENTO EN BASE DE DATOS
	try {
        //await Book.create({ title, description, author, rating })
        await Movies.create({ title, genre, plot, cast  } )
        return res.redirect("/movies")

    }catch(error){
        console.log(error)
    }

}

exports.deleteMovies = async(req, res) => {

    //NECESITO EL ID DEL LIBRO PARA EDITAR
    const {id} =req.params
    //DATOS DEL FORMULARIO NUEVOS CON LOS CUALES VOY A ACTUALIZAR
    //const deleteBook = await Book.findByIdAndDelete(bookID)
    await Movies.findByIdAndDelete(id)
    res.redirect("/movies")
}

exports.getMoviesOne = async (req, res) => {

    try {
        const {id} = req.params
        const foundMovies = await Movies.findById(id).populate("cast")
        console.log(foundMovies)
    
        res.render("movies/single-movies",{
            dataM: foundMovies

        })

    }catch(error){

        console.log(error)

    }

    
}

exports.editMovies = async(req, res) => {
    const {id}=req.params
    const foundMovies = await Movies.findById(id)
    const allCelebrities = await Cele.find()

    res.render("movies/edit-movie", {
        foundMovies,
        allCelebrities
    })

}

exports.editMoviesForm = async(req, res) => {

    //NECESITO EL ID DEL LIBRO PARA EDITAR
    const {id} =req.params
    //DATOS DEL FORMULARIO NUEVOS CON LOS CUALES VOY A ACTUALIZAR
    const { title, genre, plot, cast  } = req.body
    //actualizar base de datos
    await Movies.findByIdAndUpdate(
        id,{ title, genre, plot, cast  },
        {new:true}
    )

    // REDIRECCIONAR A LA PAGINA INDIVIDUAL DEL LIBRO
        return res.redirect(`/movies/${id}`)

}