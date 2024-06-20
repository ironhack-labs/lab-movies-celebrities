const { Schema, model, SchemaType } = require('mongoose');

const movieSchema = new Schema({
  
    title: String,
    genre: String,

    plot: String,
    cast: {
        type: SchemaType.ObjectId,
        ref:"celebrity"
    }
    
 });
 module.exports = model('Movie',movieSchema);