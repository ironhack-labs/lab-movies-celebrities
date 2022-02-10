const async = require("hbs/lib/async")
const mongoose = require("mongoose")
const Celebrity	= require("./../models/Celebrity.model")



exports.create = (req, res) => {
	res.render("celebrities/new-celebrity")
}

exports.createForm = async (req, res) => {
    const { name, occupation, catchPhrase } = req.body

    try {
        await Celebrity.create({name,occupation,catchPhrase})
        return res.redirect("/celebrities")
    } catch (error) {
        return res.render("celebrities/new-celebrity", { errorMessage: "Error"})
    }
}
gi