
const mongoose		= require("mongoose")
const Celebrity			= require("./../models/Celebrity.model")


// create celebrities (render)
exports.createCelebs = (req, res) =>{
    res.render('celebrities/new-celebrity')
}


// post form celebrities (form)
exports.createCelebsForm =async (req, res) =>{
 console.log(req.body)
    const {name, occupation, catchPhrase} = req.body
    try {
			await Celebrity.create({ name, occupation, catchPhrase })
		    return res.redirect("/celebrities")	
    	} catch (error) {
		
		return res.render("celebrities/new-celebrity",{ errorMessage:"Try again"})
	}
}


// get celebrities
exports.getCelebs = async (req, res) => {

    try {
	
		const foundCeleb = await Celebrity.find({})

		res.render("celebrities/celebrities", {
			data: foundCeleb
		})

	} catch (error) {
		
		console.log(error)

	}
}	
