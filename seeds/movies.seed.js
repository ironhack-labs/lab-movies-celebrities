const mongoose = require('mongoose');
const Movie = require('../models/Movie.model')
const DBNAME = 'mongodb://localhost/lab-movies-celebrities';

mongoose.connect(DBNAME)

const movies = [
{
    title:String,
    genre:String,
    plot:String,
    cast:[
        {
            type:Schema.Types.ObjectId,
            ref:'Celebrity'
        }
    ]


},
{

},
{

},
{

},
{

}
];

Movie.create(movies, (err) => {
    if (err) {
        throw err;
    } else {
        console.log(`have been Created ${movies.length} movies`);
    }
    mongoose.connection.close();
})