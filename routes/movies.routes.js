// iteration #6
const router = require( 'express' ).Router();
const Movie = require( '../models/Movie.model' );
const Celebrity = require( '../models/Celebrity.model' );

router.get( '/movies/create', ( req, res, next ) => {
	Celebrity.find()
		.then( foundCelebrities => {
			res.render( 'movies/new-movie', { foundCelebrities } );
		} )
		.catch( err => next( err ) );
} );

router.post( '/movies/create', ( req, res, next ) => {
	const { title, genre, plot, cast } = req.body;
	console.log( req.body );
	Movie.create( { title, genre, plot, cast } )
		.then( () => {
			res.redirect( '/movies' );
		} )
		.catch( () => {
			res.render( 'movies/new-movie' );
		} );
} );

module.exports = router;
