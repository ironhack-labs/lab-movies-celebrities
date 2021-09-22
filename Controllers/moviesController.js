const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

exports.newGetMovie = async (req, res) => {
  const dbCelebrities = await Celebrity.find();
  // console.log(dbCelebrities);
  res.render("movies/new-movie", {
    dbCelebrities,
  });
};

exports.newPostMovie = async (req, res) => {
  const { title, genre, plot, cast } = req.body;

  const newMovie = await Movie.create({ title, genre, plot, cast });

  console.log(newMovie);
  return res.render("movies/new-movie");
};

exports.listMovies = async (req, res) => {
  try {
    const listMov = await Movie.find({});
    return res.render("movies/movies", {
      listMov,
    });
  } catch (error) {}
};

exports.detailsMovie = async (req, res) => {
  // console.log(req.params.id);
  try {
    const movieDetails = await Movie.findById(req.params.id).populate("cast");
    // console.log(movieDetails);
    return res.render("movies/movie-details", movieDetails);
  } catch (error) {
    console.log(`Hubo un error en los details: ${error}`);
  }
};

exports.deteleMovie = async (req, res) => {
  // console.log(req.params.id);
  try {
    const deleteMovie = await Movie.findByIdAndRemove(req.params.id);
    return res.redirect("/movies");
  } catch (error) {
    console.log(`Error al borrar Movie: ${error}`);
  }
};

exports.editGetMovie = async (req, res) => {
  // console.log(req.params.id);
  try {
    const movieFind = await Movie.findById(req.params.id).populate("cast");
    // console.log(movieFind);
    const celebrities = await Celebrity.find();
    // console.log(`Ver: ${celebrities}`);
    return res.render("movies/edit-movie", {
      data: { movieFind, celebrities },
    });
  } catch (error) {
    console.log(`Error al ver edicion: ${error}`);
  }
};

exports.editPostMovie = async (req, res) => {
  const { title, genre, plot, cast } = req.body;
  console.log(req.params.id);
  try {
    const updateMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: { title, genre, plot, cast } },
      { new: true }
    );

    console.log(updateMovie);
    return res.redirect("/movies");
  } catch (error) {
    console.log(`Error al editar: ${error}`);
  }
};
