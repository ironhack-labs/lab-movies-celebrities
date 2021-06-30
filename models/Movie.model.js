const {Schema, model } = require("mongoose");

const MovieSchema = new Schema ({
    title: String,
    genre: String, 
    /*  { type: String, enum: ['Actor', 'Singer', 'Comedian', 'Unknown'] }, */
    plot: String, 
    cast: [{
        type: Schema.Types.ObjectId,
        ref: "Celebrity",
    }],
});

module.exports = model("Movie", MovieSchema);