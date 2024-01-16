const {model, Schema} = require("mongoose");

const movieSchema = new Schema ({
    title:{type: String, required: [true, "Please add a title."]},
    genre:{type: String},
    plot: {type: String},
    celebrity: {type: Schema.Types.ObjectId, ref:"Celebrity"},
    addedBy: {type: Schema.Types.ObjectId, ref:"User"},
    image: {type: String}
});

module.exports =  model ("Movie", movieSchema);