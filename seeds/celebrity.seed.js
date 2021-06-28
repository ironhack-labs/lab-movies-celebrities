require('../db')
let CelebrityModel = require('../models/Celebrity.model')
const mongoose = require('mongoose')
// we're mimicking a scenario where a user will create a post
CelebrityModel.create([
  {name: 'Rita', occupation: 'Coding', catchPhrase: "BlahBlabah"},
  {name: 'Humberto', occupation: 'Coding', catchPhrase: "BlahBlabah2"},
])
  .then(() => {
    console.log('Posts seeded')
    mongoose.connection.close()
  })
  .catch((err) => {
    console.log('ERROR: ', err)
    mongoose.connection.close()
  })