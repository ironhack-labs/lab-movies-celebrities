//  Add your code here


const { Schema, model } = require('mongoose')

const moviesSchema = new Schema({

    title: { type: String },
    genre: { type: String },
    plot: { type: String },
    cast: [{
        ref: 'celebrities',
        type: Schema.Types.ObjectId
    }]

},
    {
        timestamps: true
    })


module.exports = model('movies', moviesSchema)