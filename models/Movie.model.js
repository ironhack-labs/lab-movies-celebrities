const moongose = require('mongoose');
const Schema = moongose.Schema;

const movieSchema = new Schema({
	title: String,
	genre: String,
	plot: {
		type: String,
		trim: true
	},
	cast: [{ type: Schema.Types.ObjectId, ref: 'Celebrity' }]
})

Movie = moongose.model('Movie', movieSchema);

module.exports = Movie;