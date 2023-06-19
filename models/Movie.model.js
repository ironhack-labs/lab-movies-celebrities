
// ITERATION 5

const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema ({
    title: {type: String, require:true},
    genre: {type: String, require:true},
    plot: {type: String, require:true},
    cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}]
})

const Movie = mongoose.model('Movie', movieSchema);

module.exports= Movie;

// ITERATION 5 (END)
