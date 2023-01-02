//  Add your code here

const { Schema, model, default: mongoose } = require('mongoose');

const movieSchema = new Schema(
    {
       title: String,
        genre: String,
        plot: String,
        cast:[{
            type: mongoose.Schema.Types.ObjectId,
            ref :"Celebrity"
          }],
    },
    {
        timestamps: true
    }
);

module.exports = model('Movie', movieSchema);