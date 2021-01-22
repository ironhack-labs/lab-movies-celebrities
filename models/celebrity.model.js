const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// const Schema = mongoose.Schema;
// const model = mongoose.model;

const celebritySchema = new Schema(
    {
    name: { type: String, required: true },
    // description: { type: String },
    occupation: String,
    catchPhrase: String,
    
    },
    {
    timestamps: true
    }
);

module.exports = model("Celebrity", celebritySchema);