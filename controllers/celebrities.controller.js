const Celebrity = require('../models/Celebrity.model');


//list celebrities 
module.exports.list = (req, res, next) => {
    Celebrity.find()
    .then((celebrities) => {
        res.render("celebrities/celebrities", {celebrities})
    })
    .catch((err) => console.error(err))
}


//create new celebrity
module.exports.create = (req, res, next) => {
    res.render("celebrities/new-celebrity")
}

module.exports.doCreate = (req, res, next) => {
    Celebrity.create(req.body)
    .then ((createdCelebrity) => {
        console.log('💃 celebrity creada')
        res.redirect("/celebrities")
    })
    .catch ((err) => next (err))
}


//see details
module.exports.details = (req, res, next) =>{
    const {id} = req.params
    Celebrity.findById(id)
    .then((celebrity) => {
        res.render("celebrities/detail", {celebrity})
    })
    .catch((err) => next(err))
}


//edit
module.exports.edit = (req, res, next) => {
    const  {id } = req.params;

    Celebrity.findById(id)
       .then((celebrity) => {
          res.render("celebrities/new-celebrity", {celebrity, isEdit: true})
        })
    };
  module.exports.doEdit = (req, res, next) => {
    const  {id}  = req.params;
  
    Celebrity.findByIdAndUpdate(id, req.body, { new: true })
      .then((celebrity) => {
        console.log("💃👍 celebrity updated")
        res.redirect(`/celebrities/${celebrity.id}`)
      })
     
  };




  // delete celebrity
  
  module.exports.delete = (req, res, next) => {
    const { id } = req.params
  
    Celebrity.findByIdAndDelete(id)
      .then(() => {
        res.redirect('/celebrities')
      })
      .catch(next)
  }