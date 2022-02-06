const { Schema, model } = require('mongoose')
const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast:[{
            type:Schema.Types.ObjetctId,
            ref: 'Celebrity'
        }],///ni idea de si esto funciona ???? no estoy seguro    
    },
    {
        timestamps: true
    }
);
module.exports = model('movie', movieSchema)
