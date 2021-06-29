//  Add your code here

//let {Schema, model} = require('mongoose')
const mongoose = require('mongoose')


//create Schema
                    //new mongoose.Schema!!!!!!!!!!!!!!!!!!!!!!!!!!!
const CelebSchema = new mongoose.Schema ({

name: {
    
    type: String,
    //required: true
},


occupation: {
    
    type: String,
   //required: true

},

catchPhrase:{
   type: String,
   //required: true
} 

})



//create instance = model out of Schema    'Celebrity' refers to 1 elem of collec/model
const CelebrityModel = mongoose.model('Celebrity', CelebSchema)




//export model
module.exports = CelebrityModel


