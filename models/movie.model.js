const {Schema, model} = require ("mongoose");

const moveSchema = new Schema ({
title: String,
genre: String,
plot: String,
cast: [{type: Schema.Types.ObjectId, ref: "Post"}],
});

module.exports = ("Movie", movieSchema);