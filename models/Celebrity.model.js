//  Add your code here

//Importaciones

const mongoose          =require("mongoose")

//Schema

const celebritySchema   =  mongoose.Schema({

    name:String,
    occupation:String,
    catchPhrase:String
})

//Modelo

const Celebrity = mongoose.model("Celebrity",celebritySchema)

//Exportacion

module.exports=Celebrity