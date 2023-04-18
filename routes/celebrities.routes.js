const router = require( 'express' ).Router();
const Celebrity = require( '../models/Celebrity.model' );

router.get( '/celebrities/create', ( req, res, next ) => {
	console.log( req );
	res.render( 'celebrities/new-celebrity' );
} );

router.post( '/celebrities/create', ( req, res, next ) => {
	const { name, occupation, catchPhrase } = req.body;
	Celebrity.create( { name, occupation, catchPhrase } )
		.then( () => {
			res.redirect( '/celebrities' );
		} )
		.catch( foundCelebrities => {
			res.render( 'celebrities/new-celebrity', { foundCelebrities } );
		} );
} );

module.exports = router;
