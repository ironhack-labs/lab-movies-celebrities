const { Schema, model, default: mongoose } = require("mongoose");

//  Add your code here
const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Celebrity'
        }]
    }
);

module.exports = model('Movie', movieSchema);