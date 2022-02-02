![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Mongoose Movies

![hollywood](https://images.unsplash.com/photo-1534253893894-10d024888e49?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80)

## Introduction
Everyone likes celebrities, right? Well, even if you don't, now is your chance to create your own, better, fictional celebrities!
Let's create an Express app with all the basic CRUD actions that will allow the user to create their own celebrities and edit them as they see fit.

The user should be able to:

**1. See the list of celebrities**\
**2. See the details of a celebrity**\
**3. Add new celebrities**\
**4. Update existing celebrities**\
**5. Delete celebrities**

But wait! That's not all!

Once we have our celebrities, we need something for them to do!
Let's make up some movie ideas for our celebrities to star in.  
That means we'll need all the basic CRUD actions for movies as well.  

The user should be able to:

**6. See the list of movies.**\
**7. See the details of a movie.**\
**8. Add new movies.**\
**9. Update existing movies.**\
**10. Delete movies.**\


## Requirements

- Fork this repo
- Clone this repo


## Submission

- Upon completion, run the following commands:

```
$ git add .
$ git commit -m "done"
$ git push origin master
```
- Create Pull Request so your TAs can check up your work.


## Instructions

### Iteration 0 | Initialize the project

After forking and cloning the project, you will have to add a `.env` file:

```
PORT=3000
```

And you have to install all the dependencies:


```sh
$ npm install
```

Now you are ready to start 🚀


## Iteration #1: The `Celebrity` Model

Once we have generated our Express app, our first step is to create the `Celebrity` model and seed some initial celebrities in our database.

The `Celebrity` model should have:
- `name` - String (like _Tom Cruise, Beyonce, Daffy Duck,_ etc.)
- `occupation` - String (what the celebrity does, why they are famous.  For example _actor, singer, comedian_, or you can put _unknown_ if your celebrity is someone like Kim Kardashian)
- `catchPhrase` - String (every celebrity needs a good catch phrase.  Well maybe not all of them have one in real life, but all of _our_ celebrities will have a catch phrase.  This can be pretty much anything)


### Steps we will follow in this iteration:

1. Create the `celebrity.js` model file in the `models/` folder.
2. In the `celebrity.js` model file:
    - Create the `Celebrity` model with the schema.
    - Create the celebrity schema with `name`, `occupation` and `catchPhrase`.
    - Export the `Celebrity` model.
3. Create the `seeds.js` file in the `bin/` folder.
4. In `seeds.js` file:
    - Create an array of 3 objects, each with `name`, `occupation` and `catchPhrase` for our initial celebrities.
    - Call the `Celebrity` model's `create` method with the array as argument.
    - In the `create` method's callback, display feedback.
5. Run the seed file with `node` to seed your database.
6. Check the database with the `mongo` command to confirm that your data was saved.


## Iteration #2: Listing Our Celebrities

Now that we've got some celebrities in the database, we can start working with them in our Express app. Let's **display a list of all the celebrities**.

Here's the route we will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/celebrities` |    GET    | Show all celebrities |

### Steps we will follow in this iteration:

1. Locate the `/celebrities` GET route in `routes/celebrities.js`.
2. In the route callback:
    - Call the `Celebrity` model's `find` method to retrieve all the celebrities.
    - If there's an error, call the route's `next` function and return the error.
    - If there isn't an error, render the `celebrities/index` view.
    - Pass the array of celebrities into the view as a variable.
3. Create the `celebrities/` folder inside `views/`.
4. Create the `index.hbs` view file inside the `views/celebrities/` folder.
5. In the `views/celebrities/index.hbs` view file:
    - Add an `<h2>` tag for the page's heading.
    - Use a `forEach` loop to display tags with each celebrity's `name`.
6. In the `views/index.hbs` (homepage) file:
    - Add a link that goes to the `/celebrities` route.


## Iteration #3: The Celebrity Details Page

We've got a list of celebrities that displays each of their `name`, but what if we want to see the other details? In our `views/celebrities/index.hbs` view with our list of celebrities, let's add links so that the user can click on any celebrity's name, and go to a page specifically for that celebrity.  On this page, we will show all the details of that celebrity.

Here's the route we will be using:

|     Route     | HTTP Verb |      Description      |
|---------------|-----------|-----------------------|
| `/celebrities/:id` |    GET    | Show a specific celebrity |


### Steps we will follow in this iteration:

1. Create the `/celebrities/:id` GET route in `routes/celebrities.js`.
2. In the route callback:
    - Call the `Celebrity` model's `findOne` or `findById` method to retrieve the details of a specific celebrity by its id.
    - If there's an error, call the route's `next` function and return the error.
    - If there isn't an error, render the `celebrities/show` view.
    - Pass the variable with the celebrity's details into the view.
3. Create the `show.hbs` view file inside the `views/celebrities/` folder.
4. In the `views/celebrities/show.hbs` view file:
    - Add an `<h2>` for the page's heading.
    - Display tags with the celebrity's `name`, `occupation` and `catchPhrase`.
6. In the `views/celebrities/index.hbs` view file:
    - As part of the loop that displays each celebrity's name, add a link that goes to the `/celebrities/:id` route with the `:id` replaced by the actual celebrity's id.

## Iteration #4: Adding New Celebrities

Now that we have a list of celebrities, as well as a personalized details page for each celebrity, let's make it so the user can **add new celebrities to the database**

|     Route     | HTTP Verb |          Description          |
|---------------|-----------|-------------------------------|
| `/celebrities/new` |    GET    | Show a form to create a celebrity |
|   `/celebrities`   |   POST    | Send the data from the form to this route to create the celebrity and save to the database  |

### Steps we will follow in this iteration:

1. Locate the `/celebrities/new` GET route in `routes/celebrities.js`:
2. In that route's callback:
  - Render the `celebrities/new` view.
3. Create the `new.hbs` view file inside the `views/celebrities` folder
4. In the `views/celebrities/new.hbs` view file:
   - Add an `<h2>` for the page's heading.
   - Add a `<form>` tag that makes a POST request to `/celebrities`.
   - Add `<input>` tags inside the form so the user can fill in values for each attribute of the celebrity.  Make an input for `name`, `occupation`, and `catchPhrase`
   - Add a `<button>` tag in the form so the user can submit the form once they are done filling it out.
5. Locate the `/celebrities` post route in `routes/celebrities.js`.
6. In that route's callback:
    - Create an object with keys for `name`, `occupation`, and `catchPhrase`.
    - Values for those keys should come from the form (`req.body` is the object full of the values from the form)
    - Create an instance of the `Celebrity` model with the object you made in the previous step
    - Call the `save` method to save the new celebrity to the database
    - If there is an error, render the `celebrities/new` view so the user can try again.
    - If there is no error, redirect to the page with the list of celebrities
7. In the `views/celebrities/index.hbs` view file:
    - Add a link that goes to the page you just created with the form to create a new celebrity.

## Iteration #5: Deleting Celebrities

Now that we have a list of celebrities, a celebrity details page, and a page to create new celebrities, we only have 2 features left to implement: editing celebrities and deleting them.  Since deleting is simpler, let's start with that.

|        Route         | HTTP Verb |       Description       |
|----------------------|-----------|-------------------------|
| `/celebrities/:id/delete` |   POST    | Delete a specific celebrity |

### Steps we will follow in this iteration:

1. In the `views/celebrities/index.hbs` file:
    - As part of the loop, add a `<form>` tag that makes a POST request to `celebrities/:id/delete` where the `:id` is replaced by the actual ID of each celebrity.
    - Add a `<button>` tag inside the form so that it can be submitted.
2. Create the `/celebrities/:id/delete` POST route in your `routes/celebrities.js` file
3. In that route's callback:
    - Use the `Celebrity` model's `findByIdAndRemove` method to delete the celebrity by its ID.
    - If there's an error, call the route's `next` function and return the error
    - If there is no error, redirect to the list of celebrities page.  


## Iteration #6 (Bonus): Editing celebrities

Final piece of our CRUD puzzle: **editing existing celebrities**.

Here are the routes we will be using:

|       Route        | HTTP Verb |          Description          |
|--------------------|-----------|-------------------------------|
| `/celebrities/:id/edit` |    GET    | Show a form to edit a celebrity |
|   `/celebrities/:id`    |   POST    | Send the data from the form to this route to update and save the celebrity from the database         |


### Steps we will follow in this iteration:

1. Create the `/celebrities/:id/edit` GET route in `routes/celebrities.js`.
2. In that route's callback:
    - Call the `Celebrity` model’s `findOne` or `findById` method to retrieve a specific celebrity by its id.
    - If there's an error, call the route's `next` function and return the error.
    - If there isn't an error, render the `celebrities/edit` view.
    - Pass the variable with the celebrity’s details into the view.
3. Create the `edit.hbs` view file inside the `views/celebrities/` folder.
4. In the `views/celebrities/edit.hbs` view file:
    - Add an `<h2>` tag for the page's heading.
    - Add a `<form>` tag that makes a POST request to `/celebrities/:id` with the `:id` replaced by the actual celebrity's id.
    - Add `<input>` tags inside the form for each attirbute of the celebrity.
      - Bonus: When you render the edit form, make sure each of the input fields is pre-filled with the current value of the attribute for that celebrity
    - Add a `<button>` tag inside the form so that the user can submit the form once they are done editing.
5. Locate the `/celebrities/:id` POST route in the `routes/celebrities.js` file.
6. In that route's callback:
    - Create an object with keys for each attribute of a celebrity (celebrity has 3 attributes. What were they again? Look back and review if you forgot.)
    - Values for those keys should come from the form submission (`req.body`).
    - Call the `Celebrity` model’s `update` method and use the celebrity's id to specify which celebrity we are updating. Also, use the object you just created with the updated attributes for the celebrity and pass this object into the `update` method as the second argument.
    - If there is an error retrieving that celebrity, call the route's `next` function and return the error
    - If there is no error, redirect back to the list of celebrities.

## Celebrities - Done!

At this point, we have implemented all the basic CRUD actions for the Celebrity model in our app.  Nice work!

Now that we've done all this good work, it's time to do it all over again, but for the `Movie` model.  After all, what's the point of having all these celebrities if we can't make up fake movies to cast them in?

We are going to create a `Movie` model and implement all the same CRUD actions for this model as well.  Don't worry, it's really much easier the second time around.  

## Iteration #7: The `Movie` model

Now when we've started all this good work, let's keep up strong and build all the routes for the `Movie` model. But first, let's create the `Movie` model.


The `Movie` model should have:
- `title` - String
- `genre` - String
- `plot` - String
- `cast` - Array of object IDs referencing the *celebrity* model (basically, the array of celebrities' IDs) 

### Steps we will follow in this iteration:

Go back and review what you did to create the `celebrity` model.  You'll need to create a file for the model, and in that file, you'll need to create a schema for the model as well. Don't forget, you have to `module.exports` the `Movie` model.

## Iteration #8: Adding new movies

Okay, the next step is to make it so the user can **add new movies to the database**.

|     Route     | HTTP Verb |          Description          |
|---------------|-----------|-------------------------------|
| `/movies/new` |    GET    | Show a form to create a movie |
|   `/movies`   |   POST    | Send the data from the form to this route to create the movie and save it to the database  |

### Steps we will follow in this iteration:

Review how you did this for the `celebrity` model.
  - Create 2 new routes, one to render page with the form on it, and one to send the data to after the form is filled out
    - In the GET route that displays the form to create a new movie (which renders the `movies/new` view), make sure you pass all the celebrities from your database so your users can choose which ones are in the cast of the movie you're just creating (**hint**: You will have to use [select multiple](https://www.w3schools.com/tags/att_select_multiple.asp) tag)
  - Make sure the form is making a POST request to the other route you just created (`/movies`)
  - In your post route, create an object with all the info you just received from the form. (Remember, `req.body`)
  - Use this object to create a new movie in the database and redirect back to the page with your list of all movies
  - Make sure to add a link to the form on the movies index page so the user can easier navigate

## Iteration #9: Listing our movies

Now that we've got some movies in the database, let's make a page where we list all our movies, just like we did with the `celebrity` model.

Here's the route we will be using:

|   Route   | HTTP Verb |   Description   |
|-----------|-----------|-----------------|
| `/movies` |    GET    | Show all movies |


### Steps we will follow in this iteration:

Go back and review how you did this for the `celebrity` model.  You'll need to:
  - Create a GET route that will render the file in which we will display movies (`movies/index` view)
  - Use a database query to retrieve all the movies from your database and render the view
  - Use a `{{#each}}` loop to display all your *movie titles* on that page
  - Add a link to the page you just created on the home page so the user can navigate to it.


## Iteration #10: The movie details page

We've got a list of all movies that displays each of their *titles*, but what if we want to see the other details? In our `movies/index` view with our list of movies, let's add links so that the user can click on any movie's title, and go to a details page of each movie. On this page, we will show all the details of that movie.
Here's the route we will be using:

|     Route     | HTTP Verb |      Description      |
|---------------|-----------|-----------------------|
| `/movies/:id` |    GET    | Show a specific movie |


### Steps we will follow in this iteration:

1. We need `/:id` part to change dynamically as we click on different movies' titles. This being said, as part of the loop that displays each movie's title, add a link that goes to the `/movies/:id` route with the `:id` replaced by the actual movie's id 🔑
2. Create the `/movies/:id` GET route in `routes/movies.js`.
3. In the route:
    - On the `Movie` model call `findOne()` or `findById()` method to retrieve the details of a specific movie by its ID
        - Don't forget you have `cast` as the array of celebrity IDs, and we need to `populate()` in order to get the full data about the celebrities 🎯
    - If everything is fine (*.then()*), render the `movies/show` view and pass the variable with the movie's details into the view
    - If there's an error, catch it.
4. In the `views/movies/show.hbs` view file:
    - Add an `<h2>` for the page's heading.
    - Display tags with the movie's `title`, `genre`, `plot` and `cast`.

## Iteration #11: Deleting movies

Now that we have a list of movies, a movie details page, and a page to create new movies, we only have 2 features left to implement: *editing* celebrities and *deleting* them.  Since deleting is simpler, let's start with that.

|        Route         | HTTP Verb |       Description       |
|----------------------|-----------|-------------------------|
| `/movies/:id/delete` |   POST    | Delete a specific movie |

### Steps we will follow in this iteration:

1. In the `views/movies/show.hbs` file:
    - Add a `<form>` tag that makes a POST request to `/movies/:id/delete` where the `:id` is replaced by the actual ID of the movie.
    - Add a `<button>` tag inside the form so that it can be submitted.
2. Create the `/movies/:id/delete` POST route in your `routes/movies.js` file
3. In the route:
    - Use the `Movie` model's `findByIdAndRemove()` method to delete the specific movie by its ID.
    - If everything is good (`.then()`), redirect to the list of movies page  
    - If there's an error, catch it

## Iteration #12: Editing movies

Final piece of our CRUD puzzle: **editing existing movies**.

Here are the routes we will be using:

|       Route        | HTTP Verb |          Description          |
|--------------------|-----------|-------------------------------|
| `/movies/:id/edit` |    GET    | Show a form to edit a movie |
|   `/movies/:id`    |   POST    | Send the data from the form to this route to update the specific movie         |

### Steps we will follow in this iteration:

1. Create the `/:id/edit` GET route in `routes/movies.js`.
2. In that route:
    - Call the `Movie` model’s `findOne()` or `findById()` method to retrieve a specific movie by its ID
    - If everything is good, render the `movies/edit` view
    - Pass the variable with the movie's details into the view
3. In the `views/movies/edit.hbs` view file:
    - Add an `<h2>` tag for the page's heading.
    - Add a `<form>` tag that makes a POST request to `/movies/:id` with the `:id` replaced by the actual movie's ID.
    - Add `<input>` tags inside the form for each attribute of the movie.
      - **Hint**: When you render the edit form, make sure each of the input fields is pre-filled with the current value of the attribute for that movie
    - Add a `<button>` tag inside the form so that the user can submit the form once they are done editing.
    - **BONUS**: Make the current cast members *selected* so the user knows who is in the cast currently.
5. Create `/movies/:id` POST route in the `routes/movies.js` file
6. In that route:
    - Create an object with `Movie` model keys and it's values should come from the form submission (which is `req.body`)
    - Now you can apply different methods - `update()` or `findByIdAndUpdate()` to find the movie and send the updated values to the database.
    - If there is no error, redirect back to the movie details page.

Now you can come back to the bonus part related to the celebrity model :wink:.


**That's it! 🏆**

Happy Coding! :heart:
