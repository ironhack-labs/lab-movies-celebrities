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
	Movie.create( { title, genre, plot, cast } )
		.then( () => {
			res.redirect( '/movies' );
		} )
		.catch( () => {
			res.render( 'movies/new-movie' );
		} );
} );

// iteration #7
router.get( '/movies', ( req, res, next ) => {
	Movie.find()
		.then( foundMovies => {
			res.render( 'movies/movies', {foundMovies} );
		} )
		.catch( err => next( err ) );
} );

// iteration #8
router.get( '/movies/:id', ( req, res, next ) => {
	const movieId = req.params.id;
	Movie.findById( movieId )
		.populate( 'cast' )
		.then( foundMovie => {
			res.render( 'movies/movie-details', { foundMovie} );
		} )
		.catch( err => next( err ) );
} );

// iteration #9
router.post( '/movies/:id/delete', ( req, res, next ) => {
	const movieId = req.params.id;
	Movie.findByIdAndDelete( movieId )
		.then( () => {
			res.redirect( '/movies' );
		} )
		.catch( err => next( err ) );
} );

// iteration #10
router.get( '/movies/:id/edit', ( req, res, next )=> {
	const movieId = req.params.id;
	const editArr = async () => {
		try {
			const foundMovie = await Movie.findById( movieId );
			const foundCelebrities = await Celebrity.find();

			// console.log( foundMovie.cast );
			// console.log( foundCelebrities );

			foundMovie.cast.forEach( () => {

			} );


			console.log( filteredCelebrities );

			// res.render( 'movies/edit-movie', { foundMovie } );
		} catch ( err ) {
			next( err );
		}
	};
	editArr();
} );

router.post( '/movies/:id/edit', ( req, res, next )=> {
	const movieId = req.params.id;
	const { title, genre, plot, name, occupation, catchPhrase } = req.body;
} );

module.exports = router;
