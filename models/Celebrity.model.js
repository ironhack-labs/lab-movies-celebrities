const mongoose = require('mongoose');
const Schema= mongoose.Schema
const celebritySchema= new Schema({
    name:{
        type:String
    },
    occupation:{
        type:String
    },
    catchPhrase:{
        type:String
    },    
})

const Celebrity=mongoose.model('Celebrity',celebritySchema);

module.exports= Celebrity;

// Guardo el modelo de cada cosa que vaya a crear con sus propiedades
// importantes lineas 1 y 2 para rquerir