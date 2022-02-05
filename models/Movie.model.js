const { Schema, model } = require('mongoose')

const movieSchema = new Schema({
    title: { required: true, type: String },
    genre: { required: true, type: String },
    plot: { required: true, type: String },
    cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Celebrity'
    }],
},
    { timestamps: true }
)


module.exports = model('Movie', movieSchema)