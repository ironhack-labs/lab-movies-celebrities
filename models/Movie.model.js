const { Schema, model } = require('mongoose')

const modelSchema = new Schema({

    title: String,
    genre: String,
    plot: String,
    cast: [{
        type: Schema.Types.ObjectId,     //Esquema.tipo de dato.ObjectId
        ref: "celebrity"
    }]
})

module.exports = model('movie', modelSchema)