const Cele = require("../models/Celebrity.model")

exports.getCelebrities = async (req, res) => {

	try {
	
		const foundCelebrities = await Cele.find({})
		
		res.render("celebrities/celebrities", {
			data: foundCelebrities
			
		})

	} catch (error) {
		
		console.log(error)

	}	

}

exports.createCele = async (req, res) => {

	return res.render("celebrities/new-celebrity")

}

exports.createCeleForm = async (req, res) => {

	// 1. VERIFICAR QUE LOS DATOS DEL FORMULARIO LLEGUEN AL SERVIDOR
	const { name, ocuppation, catchPhrase } = req.body
	// const title = req.body.title
	
	// 2. CREAR EL DOCUMENTO EN BASE DE DATOS
	try {
        //await Book.create({ title, description, author, rating })
        await Cele.create({ name, ocuppation, catchPhrase } )
        return res.redirect("/celebrities")

    }catch(error){
        console.log(error)
    }

}