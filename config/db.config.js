const mongoose = require("mongoose");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(`Connected to db at ${MONGODB_URI}`);
  })
  .catch((err) => {
    console.error(`Error connecting to ${MONGODB_URI}`, err);

    process.exit(0);
  });

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected on app termination");
    process.exit(0);
  });
});
