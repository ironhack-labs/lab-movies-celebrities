require('../db')
let MovieModel = require('../models/Movie.model')
const mongoose = require('mongoose')
// we're mimicking a scenario where a user will create a post
MovieModel.create([
  {title: 'SwordsCode', genre: 'Action', plot: "one", cast: ["60da012baf7def03a02cae14", "60da012baf7def03a02cae13"]},
  {title: 'IronMachine', genre: 'Thriller', plot: "two", cast: ["60da012baf7def03a02cae14", "60da012baf7def03a02cae13"]},
])
  .then(() => {
    console.log('Posts seeded')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.log('ERROR: ', err)
    mongoose.connection.close()
  })