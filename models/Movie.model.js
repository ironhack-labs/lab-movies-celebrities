// Iteration #5: The movie model

const mongoose = require("mongoose");

const { Schema, model } = require("mongoose");

const movieSchema = new Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    plot: { type: String, required: true },
    cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity'}]
});

// With this schema setup (in cast), when you call .populate('cast') on a query, Mongoose knows to look in the collection associated with the Celebrity model and replace each ObjectId in the cast array with the corresponding full document from the Celebrity collection.

const Movie = model("Movie", movieSchema);

module.exports = Movie;