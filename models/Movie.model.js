let {Schema, model} = require('mongoose');

let MovieSchema = new Schema(
    {
     title: String,
     genre: String,
     plot: String,
     cast: [{
        type:Schema.Types.ObjectId,
        ref:"Celebrity"
     }]
    }, 
    {
     timestamps: true
    }
);

module.exports = model('Movie', MovieSchema);