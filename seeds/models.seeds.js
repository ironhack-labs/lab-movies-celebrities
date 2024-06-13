const { default: mongoose } = require("mongoose")
const Model = require('./../models/Celebrity.model');

const models = [
    { name: 'Beyonce', occupation: 'singer', catchPhrase: 'the quick brown' },
    { name: 'Jay-z', occupation: 'singer', catchPhrase: 'the quick jay' },
    { name: 'jonas brothers', occupation: 'singer', catchPhrase: 'the quick bros' }
]

const connectionString = 'mongodb://127.0.0.1:27017/lab-movies-celebrities'

mongoose
    .connect(connectionString)
    .then(x => {
        console.log(`Connected to Mongo database: "${x.connections[0].name}"`)
        return Model.create(models)
    })
    .then(dronesFromDB => {
        console.log(`Created ${dronesFromDB.length} models`)
        return mongoose.connection.close()
    })
    .then(() => {
        console.log('DB connection closed!')
    })
    .catch(err => {
        console.log(`An error occurred while creating models from the DB: ${err}`)
    })