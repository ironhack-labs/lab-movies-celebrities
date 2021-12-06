const {Schema,model} = requrie('mongoose');

const movieSchema = new Schema(
    {
        title: String,
        genre: String,
        plot: String,
        cast: [{type: Schema.Types.ObjectId, ref: 'Celebrity'}],
    }
)

modules.exports = module('Movie',movieSchema)