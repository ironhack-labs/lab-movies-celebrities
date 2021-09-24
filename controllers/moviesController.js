const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");
const User = require("../models/User.model");
const moment = require("moment");
const formidable = require("formidable");
const fs = require("fs");
const path = require("path");

const addAndUpdated = async (req, res, add, pathToRemove) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const { title, genre, plot, cast } = fields;
    const oldPath = files.image.path;
    const newPath = path.join("/images") + "/" + files.image.name;
    const rawData = fs.readFileSync(oldPath);

    fs.writeFile(path.join(__dirname, "..", "public") + newPath, rawData, async (err) => {
      if (err) console.log(err);

      if (add) {
        let newMovie = new Movie({
          title: title,
          genre: genre,
          plot: plot,
          cast: cast,
          image: newPath,
          updated: moment(),
        });
        await newMovie.save();
        await User.findByIdAndUpdate(req.session.currentUser._id, { $push: { movies: newMovie._id } });
        return res.redirect("/movies?added=true");
      } else {
        let updatedMovie = {
          title: title,
          genre: genre,
          plot: plot,
          cast: cast,
          image: newPath,
          updated: moment(),
        };
        let pathRemove = path.join(__dirname, "..", "public" + pathToRemove);
        fs.unlinkSync(pathRemove);
        await Movie.findByIdAndUpdate(req.params.id, updatedMovie);
        return res.redirect("/movies?updated=true");
      }
    });
  });
};

exports.editMovieForm = async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  addAndUpdated(req, res, false, movie.image);
};

exports.createMovie = (req, res) => {
  addAndUpdated(req, res, true);
};

exports.editMovie = async (req, res) => {
  try {
    const { id } = req.params;
    let editMovie = await Movie.findById(id).populate("cast");
    let cast = await Celebrity.find({});
    res.render("movies/edit-movie", { cast: cast, Movie: editMovie });
  } catch (error) {
    console.log(error);
  }
};

exports.getCreatedMovies = async (req, res) => {
  try {
    let celeb = await Celebrity.find();
    res.render("movies/new-movie", { celebrities: celeb });
  } catch (error) {
    console.log(error);
  }
};

exports.getMovies = (req, res) => {
  Movie.find()
    .populate("cast")
    .then((movies) => {
      console.log(movies);
      res.render("movies/movies", { movies: movies });
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.movieDetails = (req, res) => {
  const { id } = req.params;
  Movie.findById(id)
    .populate("cast")
    .then((details) => {
      console.log(details);
      res.render("movies/movie-details", details);
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    let movie = await Movie.findByIdAndRemove(id);
    let pathRemove = path.join(__dirname, "..", "public" + movie.image);
    fs.unlinkSync(pathRemove);
    res.redirect("/movies");
  } catch (error) {
    console.log(error.message);
  }
};
