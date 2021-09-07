//  Add your code here
const { Schema, model } = require('mongoose');

const movieSchema = new Schema(
  {
    title: {type: String, unique: true},
	genre: String,
    plot: String, 
	cast: {
		type: Schema.Types.ObjectId,
		ref: 'Celebrity'
	}
  },
  {
    timestamps: true
  }
);

module.exports = model('Movie', movieSchema);