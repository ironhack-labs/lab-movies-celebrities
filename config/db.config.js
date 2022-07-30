const mongoose = require('mongoose')

//We can establish the connection between MongoDB instances and different applications
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/celebrities'

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((x) => {
        console.log(`🔌 Connected to db at ${MONGODB_URI}`)
    })
    .catch((err) => {
        console.log(`❌ Error connecting to ${MONGODB_URI}`)

        process.exit(0)
    })

process.on("SIGINT", function () {
    mongoose.connection.close(function () {
        console.log("Mongoose disconnected on app termination")
        process.exit(0)
    })
})