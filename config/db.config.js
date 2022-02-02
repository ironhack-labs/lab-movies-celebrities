
const mongoose = require("mongoose");
const DB_BASE = process.env.MONGODB_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "celebrities";
const DB_URI = `${DB_BASE}/${DB_NAME}`;

mongoose
  .connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.info(`Successfully connected to the database ${DB_URI}`))
  .catch((error) => {
    console.error(
      `An error ocurred trying to connect to de database ${DB_NAME}`,
      error
    );
  });

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected on app termination");
    process.exit(0);
  });
});