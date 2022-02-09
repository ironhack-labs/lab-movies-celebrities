
const mongoose		= require("mongoose")
const Celebrity			= require("./../models/Celebrity.model")

exports.getCelebs = (req, res) =>{
    res.render('celebrities/new-celebrity')
}

exports.createCelebs =async (req, res) =>{
 console.log(req.body)
    const {name, occupation, catchPhrase} = req.body
    try {
			await Celebrity.create({ name, occupation, catchPhrase })
		    return res.redirect("/celebrities")	
    	} catch (error) {
		
		return res.render("celebrities/new-celebrity",{ errorMessage:"Try again"})
	}
}

exports.celebs = (req, res) => {
    res.render("celebrities/celebrities")
}