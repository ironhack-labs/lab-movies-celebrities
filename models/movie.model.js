const {Schema, model} = require("mongoose");

const movieSchema = new Schema({
    name: String,
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,
        ref: "Celebrity"
        
    }]
});

module.exports = model('Movie', movieSchema);