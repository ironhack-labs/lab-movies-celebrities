// Iteration #5 

// The Movie model should have:

// title - String
// genre - String
// plot - String
// cast - Array of object IDs referencing the Celebrity model(basically, 
//     the array of celebrities' IDs)
// Steps we will follow in this iteration:
//     Go back and review what you did to create the Celebrity model.
//     You'll need to create a file for the model, and in that file, you'll need to create 
//     a schema for the model as well.Don't forget, you have to export the Movie model.



const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            unique: true,
        },
        genre: String,
        plot: String,
        cast: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Celebrity',
            },
        ],
    },
    {
        timestamps: true,
    }
)

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie



