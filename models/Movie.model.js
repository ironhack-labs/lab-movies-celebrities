//  Add your code here
// Require Schema and model methods of mongoose
const {Schema, model} = require('mongoose');

const movieSchema = new Schema(
    // Info that is going to be prompt
    {
     title: String, 
     genre: String, 
     plot: String,
     cast: [{
        type: Schema.Types.ObjectId,
        ref: 'Celebrity'
      }],
    }, 
    // MongoDB Options
    {
     timestamps: true
    }
);

module.exports = model('Movie', movieSchema);