const {Schema , model } = require("mongoose");  
const Celebrity = require('./Celebrity.model'); 


let movieModel = new Schema({
title: {
    type: String
}, 
genre: {
    type: String
}, 
plot: {
    type: String
}, 
cast: [{
    type: Schema.Types.ObjectId, 
    ref: "Celebrity"
}]
}) 
const Movie = model("Movie", movieModel) ; 
 
module.exports =  Movie; 