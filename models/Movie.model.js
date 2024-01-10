const {model, Schema} = require("mongoose");

const movieSchema = new Schema ({
    title:{type: String, required: true},
    genre:{type: String},
    plot: {type: String},
    celebrity: {type: Schema.Types.ObjectId, ref:"Celebrity"},
    image: {type: String}
});

module.exports =  model ("Movie", movieSchema);