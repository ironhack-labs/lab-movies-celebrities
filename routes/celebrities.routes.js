const router = require( 'express' ).Router();
const Celebrity = require( '../models/Celebrity.model' );

// iteration #3
router.get( '/celebrities/create', ( req, res, next ) => {
	console.log( req );
	res.render( 'celebrities/new-celebrity' );
} );

// iteration #3
router.post( '/celebrities/create', ( req, res, next ) => {
	const { name, occupation, catchPhrase } = req.body;
	Celebrity.create( { name, occupation, catchPhrase } )
		.then( () => {
			res.redirect( '/celebrities' );
		} )
		.catch( () => {
			res.render( 'celebrities/new-celebrity' );
		} );
} );

// iteration #4
router.get( '/celebrities', ( req, res, next ) => {
	Celebrity.find()
		.then( foundCelebrities => {
			res.render( 'celebrities/celebrities', {foundCelebrities} );
		} )
		.catch( err => next( err ) );
} );

module.exports = router;
