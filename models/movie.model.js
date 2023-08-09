//  Add your code here
const mongoose = require("mongoose")
//const Celebrity = require('./celebrity.model')

const schema = new mongoose.Schema(
    {
        name: { type: String },
        genre: { type: String },
        plot: { type: String },
        cast: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Celebrity' }]
    },
    {
        timestamps: true,
    }
);


const Movies = mongoose.model("Movie", schema);

module.exports = Movies