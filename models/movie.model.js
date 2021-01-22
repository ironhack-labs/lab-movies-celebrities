const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const Schema = mongoose.Schema;
// const model = mongoose.model;

const movieSchema = new Schema(
    {
    title: { type: String, required: true },
    // description: { type: String },
    genre: String,
    plot: String,
    cast: [ {type: Schema.Types.ObjectId, ref: "Celebrity" }]
    },
    {
    timestamps: true
    }
);

module.exports = model("Movie", movieSchema);