// Import the Express app from app.js
const app = require("./app");

// Set the port to use from the environment variable, defaulting to 3000 if not set
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
