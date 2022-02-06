//  Add your code here
const { Schema, model } = require('mongoose')

const celebritySchema = new Schema(
    {
        name: {
            unique: true,
            type: String,
            required: true
        },
        occupation: {
            type: String,
            enum: ['actor', 'actriz', 'cómico', 'cómica', 'modelo', 'cantante', 'mocatriz', 'influencer', 'drag', 'falsa gurú', 'desconocido'],
        },
        catchPhrase: {
            type: String,
        }
    },
    {
        timestamps: true
    }
)

module.exports = model('Celebrity', celebritySchema)
