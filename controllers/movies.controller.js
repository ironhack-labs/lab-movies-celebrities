const movie = require('../models/movie.model')
const celebrity = require('../models/Celebrity.model')


module.exports.createMovie = (req, res, next) => {
  celebrity.find() 
    .then((celebrities) => {
      res.render('movies/newMovie',{ celebrities })
        })
  };
  
module.exports.listMovies = (req, res, next) => {

  movie.find()
    .then((movieList)=>{
      res.render('movies/viewsMovies', {movieList})

    })
  
};
  module.exports.doCreateMovie = (req, res, next) => {
    //req.body.cast = req.body.cast.split(',').map(caste => caste.trim());
    req.body.cast = Array.isArray(req.body.cast) ? req.body.cast : [req.body.cast];
  
    movie.create(req.body)
      .then((createMovie) => {
        res.redirect(`/movies/${createMovie._id}`); // "/movies/dhoiashdoaishdljasd"
      })
      .catch(err => next(err));
  };

  module.exports.detailMovie = (req, res, next) => {
    const { movieId } =  req.params
      movie.findById(movieId)
        .populate('cast')
          .then((movie)=>{
            console.log(movie);
            res.render('movies/detailsMovie', {movie})
          })
     
      .catch(err => next(err));
  };

  module.exports.deleteMovie = (req, res, next) => {
    const { movieId } =  req.params
      movie.findByIdAndDelete(movieId)
        .then(() => res.redirect('/'))
      .catch(err => next(err));
  };


  module.exports.editMovie = (req, res, next) =>{
    const { movieId } =  req.params;
     movie.findById(movieId)
      .then((movie)=>{
        res.render('movies/newMovie', {movie})
      })
      .catch(err => next(err));
  }

  module.exports.doEditMovie = (req, res, next) =>{
    const { movieId } =  req.params;
     movie.findByIdAndUpdate(movieId, req.body, { new: true })
      .then((updatedMovie)=>{
        res.redirect(`/movies/${updatedMovie._id}`)
      })
      .catch(err => next(err));
  }


  