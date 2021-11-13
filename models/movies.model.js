const Schema = mongoose.Schema;

const movieSchema = new Schema({
    theTittle: String,
    genre: String,
    plot: String,
    cast: [String]
});

const Movie = mongoose.model("movie", movieSchema);

module.exports = Movie;