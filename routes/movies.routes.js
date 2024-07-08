// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here

module.exports = router;

// Create the GET route to display the form to create a new movie
// Pass all the celebrities from the database to the view
router.get("/movies/create", async (req, res) => {
    try {
        const celebrities = await Celebrity.find(); // Retrieve all celebrities from the database
        res.render("movies/new-movie", { celebrities }); // Render the view and pass the celebrities as a variable
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
});

// Create the POST route to handle the form submission
router.post("/movies/create", async (req, res) => {
    try {
        const { title, director, cast } = req.body; // Get the movie information from the form
        const movie = await Movie.create({ title, director, cast }); // Create a new movie in the database
        res.redirect("/movies"); // Redirect back to the page with the list of all movies
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
});

// Create a GET route that will render the file in which we will display movies (movies/movies.hbs)
// Use a database query to retrieve all the movies from your database and render the view

router.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find().populate("cast"); // Retrieve all movies from the database and populate the cast field with the celebrity information
        res.render("movies/movies", { movies }); // Render the view and pass the movies as a variable
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
}   );

// Use a hbs #each loop to display all your movie titles on that page
// Add a link to the page you just created on the home page so the user can navigate to it.

// Create a GET route for the home page
router.get("/", (req, res) => {
    res.render("home"); // Render the home page view
});

// Create a link on the home page to navigate to the movies page
// The link should point to the "/movies" route
// Example: <a href="/movies">Go to Movies</a>

// Update the movies route to display all movie titles using an #each loop
router.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find().populate("cast"); // Retrieve all movies from the database and populate the cast field with the celebrity information
        res.render("movies/movies", { movies }); // Render the view and pass the movies as a variable
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
});

// Create the /movies/:id GET route in routes/movies.routes.js.
// In the route:
// On the Movie model call the findOne() or findById() method to retrieve the details of a specific movie by its id
// Don't forget you have cast as the array of celebrity ids, and we need to populate() in order to get the full data about the celebrities 🎯
// If everything is fine (.then()), render the movies/movie-details view and pass the variable with the movie's details into the view
// If there's an error, catch it.

router.get("/movies/:id", async (req, res) => { // Route to display the details of a specific movie
    try {
        const movie = await Movie.findById(req.params.id).populate("cast"); // Retrieve the movie by its id and populate the cast field with the celebrity information
        res.render("movies/movie-details", { movie }); // Render the view and pass the movie as a variable
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
} ); 

// Create the /movies/:id/delete POST route in routes/movies.routes.js.
// In the route:   
// On the Movie model call the findByIdAndRemove() method to delete the movie by its id
// If everything is fine, redirect to the page with the list of movies
// If there's an error, catch it.

router.post("/movies/:id/delete", async (req, res) => { // Route to delete a specific movie
    try {
        await Movie.findByIdAndRemove(req.params.id); // Find the movie by its id and remove it from the database
        res.redirect("/movies"); // Redirect back to the page with the list of all movies
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
} ); 

// Create the /movies/:id/edit GET route in routes/movies.routes.js.
// In the route:
// On the Movie model call the findById() method to retrieve the details of a specific movie by its id
// Call the Celebrity model's find() to retrieve all celebrities for the cast.
// If everything is good, render the movies/edit-movie view
// Pass the variable with the movie's details and all celebrities into the view

router.get("/movies/:id/edit", async (req, res) => { // Route to display the edit form for a specific movie 
    try {
        const movie = await Movie.findById(req.params.id); // Retrieve the movie by its id
        const celebrities = await Celebrity.find(); // Retrieve all celebrities from the database
        res.render("movies/edit-movie", { movie, celebrities }); // Render the view and pass the movie and celebrities as variables
    } catch (error) {
        console.error(error);
        // Handle errors as needed
    }
});