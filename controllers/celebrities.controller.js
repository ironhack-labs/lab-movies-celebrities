const celebrity = require('../models/Celebrity.model')



module.exports.createCeleb = (req, res, next) => {
    res.render('celebrities/newCelebrity')
  };
  
module.exports.listCeleb = (req, res, next) => {
  celebrity.find()
    .then((celebList)=>{
      res.render('celebrities/celebritiesList', {celebList})

    })
  
};
  module.exports.doCreateCeleb = (req, res, next) => {
    celebrity.create(req.body)
      .then((createdCeleb) => {
        res.redirect(`/celebrities/${createdCeleb._id}`); // "/movies/dhoiashdoaishdljasd"
      })
      .catch(err => next(err));
  };

  module.exports.detailCeleb = (req, res, next) => {
    const { celebrityId } =  req.params
      celebrity.findById(celebrityId)
        .then((celeb)=>{
          console.log("entro en detalles")
          res.render('celebrities/viewsCelebrities', {celeb})
        })
     
      .catch(err => next(err));
  };

  module.exports.deleteCeleb = (req, res, next) => {
    const { celebrityId } =  req.params
      celebrity.findByIdAndDelete(celebrityId)
        .then(() => res.redirect('/'))
      .catch(err => next(err));
  };
  module.exports.editCelebritie = (req, res, next) =>{
    const { celebrityId } =  req.params;
    celebrity.findById(celebrityId)
      .then((celebrity)=>{
        res.render('celebrities/newCelebrity', {celebrity})
      })
      .catch(err => next(err));
  }

  module.exports.doEditCelebritie = (req, res, next) =>{
    const { celebrityId } =  req.params;
    celebrity.findByIdAndUpdate(celebrityId, req.body, { new: true })
      .then((updatedCelebrity)=>{
        res.redirect(`/celebrities/${updatedCelebrity._id}`)
      })
      .catch(err => next(err));
  }