


//req mongoose

//let {Schema, model} = require('mongoose')

const mongoose = require('mongoose')

//create Schema

                   //new mongoose.Schema
const MovieSchema = new mongoose.Schema ({

    title: {

    type: String,
    //required: true

    },

    genre: {

        type: String,
       // required: true
    
        },
        
    plot: {

        type: String,
       // required: true
    
        },

        
    cast: [{

        type: mongoose.Schema.Types.ObjectId,        //hier war fehler.nochmal Video von montag angucken!
        ref: 'Celebrity',   //refers to collec/model
     
    
        }]

})



//create Model
                                  //'Movie' = 1 elem of model
const MovieModel = mongoose.model('Movie', MovieSchema)





//export movie Model
module.exports= MovieModel