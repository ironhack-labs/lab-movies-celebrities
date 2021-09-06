//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = new Schema(
	{
		title: String,
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

const Movie = model('Movie', celebritySchema);

module.exports = Movie;
