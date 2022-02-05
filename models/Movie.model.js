const {Schema, model} = require ('mongoose')

const moviesSchema = new Schema({
    title: String,
    genre: String,
    plot: String,
    cast:[{ type: Schema.Types.ObjectId, 
            ref: 'celebrity'   
}]} , {
    timestamps:true
})

const Movies = model('movie', moviesSchema)

module.exports = Movies