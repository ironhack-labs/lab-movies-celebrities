const Celebrity = require("../models/Celebrity.model");

module.exports.createCelebrity = ((req, res, next) => {
    res.render("/celebrities/new-celebrity")
})

