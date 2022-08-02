const {Schema, model} = require('mongoose')

const celebritiesSchema = new Schema ({
    title: String,
    description: String,
    author: String,
    rating: Number,
},
{
    timestamps: true
})

/* const Book = mongoose.model('Book', bookSchema)
module.exports = Book */ // Quicker way to do before, less code:

module.exports = model('Celebrities', celebritiesSchema);
