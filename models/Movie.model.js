//  Add your code here
const mongoose = require('mongoose')

require('./Celebrity.model')

// const { Schema, model } = require("mongoose")

const moviesSchema = new mongoose.Schema({
    title : String,
    genre : String,
    plot : String,
    cast:{
        ref:'characters',
        type: mongoose.Schema.Types.ObjectId
    }
   
  });



const movieModel = mongoose.model('movie', moviesSchema)

module.exports = movieModel