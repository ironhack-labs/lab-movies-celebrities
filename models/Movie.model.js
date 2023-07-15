
const mongoose = require ("mongoose")
const REQUIRED_ERROR = 'Required field';

const movieSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true,REQUIRED_ERROR ],
          },
          genre: {
            type: String,
            required: [true,REQUIRED_ERROR ],
          },
          plot: {
            type: String,
            required: [true,REQUIRED_ERROR ],
          },
          cast: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Celebrity',
            default: [],
          }
    }
)

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;