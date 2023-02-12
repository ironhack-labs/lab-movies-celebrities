const { Schema, model } = require("mongoose")

const movieSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: String,
        plot: String,
        cast: [{
            ref: "celebrity",
            type: Schema.Types.ObjectId
        }]
    },
    {
        timestamps: true
    }
)

module.exports = model('movie', movieSchema)