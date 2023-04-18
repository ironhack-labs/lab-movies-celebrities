const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

// iteration #2
const celebritySchema = new Schema( {
	name: String,
	occupation: {
		type: String,
		enum: ['actor', 'singer', 'comedian', 'unkonwn'],
	},
	catchPhrase: String,
} );

const Celebrity = mongoose.model( 'Celebrity', celebritySchema );
module.exports = Celebrity;
