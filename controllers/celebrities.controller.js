const Celebrity = require('../models/Celebrity.model');

module.exports.list = (req, res, next) => {
    console.log('entra celebrities')
    Celebrity.find()
    .then((celebrities) => {
        res.render("celebrities/celebrities", {celebrities})
    })
    .catch((err) => console.error(err))
}

module.exports.create = (req, res, next) => {
    console.log('entra crear celebrities')
    res.render("celebrities/new-celebrity")
}

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
    .then ((createdCelebrity) => {
        console.log('💃 celebrity creada')
        res.redirect("/celebrities")
    })
    .catch ((err) => {
        console.error(err)
        res.redirect("/celebrities/create")
    })
}

  // DELETE
  
  module.exports.delete = (req, res, next) => {
    const { id } = req.params
  
    Celebrity.findByIdAndDelete(id)
      .then(() => {
        res.redirect('/celebrities')
      })
      .catch(next)
  }