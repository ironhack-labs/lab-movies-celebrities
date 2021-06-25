const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model.js");

module.exports.addCelebrity = (req, res, next) =>{
    res.render("celebrities/new-celebrity");
};

module.exports.doAddCelebrity = (req, res, next) =>{
    console.log(req.body);
    Celebrity.create(req.body)
        .then(() =>{
            res.redirect("/celebrities");
        }) .catch(()=>{
            res.render("celebrities/new-celebrity");
        })
}

module.exports.viewCelebrities = (req, res, next) => {
    Celebrity.find()
        .then((celebrities) => {
            res.render("celebrities/celebrities", {celebrities})
        }) .catch ((e) =>{
            console.log(e)
        })
}