const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/lab-movies-celebrities';

mongoose
    .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.info(`Connected to DB at ${MONGODB_URI}`);
    })
    .catch((err) => {
        console.error(`Error connecting to DB at ${MONGODB_URI}`, err);
        process.exit(0);
    });

process.on("SIGINT", () => {
    mongoose.connection.close(() => {
        console.info('Mongoose disconnected');
        process.exit(0);
    })
});