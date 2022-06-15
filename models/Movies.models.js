const {Schema, model, typeShema} = require("mongoose")


const moviesModel = new Schema({

title:String,
gnre:String,
plot:String,
//cast:[Id]


},{timestamps:true})

module.exports = model ("MOVIES",moviesModel)