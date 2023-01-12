const mongoose = require("mongoose");

const MovieModel = require("../models/Movie.model");

const CelebrityModel = require("../models/Celebrity.model");

const MONGODB_URI = "mongodb://127.0.0.1/lab-movies-celebrities";

const movies = [
  {
    title: "Star Wars",
    genre: "Action",
    plot: "Rebel ships go piu piu, Death Star goes Brrrrappp",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BOTA5NjhiOTAtZWM0ZC00MWNhLThiMzEtZDFkOTk2OTU1ZDJkXkEyXkFqcGdeQXVyMTA4NDI1NTQx._V1_.jpg",
  },
  {
    title: "Lord of the Rings",
    genre: "Fantasy",
    plot: "Basically a Harry Potter movie, what changes is the cast",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg",
  },
  {
    title: "The Dark Knight",
    genre: "Action",
    plot: "Rich guy wears a rich Halowween costume and drives a rich car to beat bad guys",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
  },
  {
    title: "Die Hard",
    genre: "Action",
    plot: "don't really remember what it is about, but I remember there is a bold guy",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BZjRlNDUxZjAtOGQ4OC00OTNlLTgxNmQtYTBmMDgwZmNmNjkxXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  },
  {
    title: "The Matrix",
    genre: "sci-fi",
    plot: "They say virtual reality is real. Can you believe it??",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
  },
  {
    title: "Pulp Fiction",
    genre: "Drama",
    plot: "Now, you’ve got a corpse in a car, minus a head, in a garage. Take me to it.",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  },
  {
    title: "King Kong",
    genre: "Adventure",
    plot: "There is a big monkey who chases little humans",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BMjYxYmRlZWYtMzAwNC00MDA1LWJjNTItOTBjMzlhNGMzYzk3XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Fast and Furious",
    genre: "Action",
    plot: "Some guys go vrrrrrr, and steal other guys",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BNzlkNzVjMDMtOTdhZC00MGE1LTkxODctMzFmMjkwZmMxZjFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
  },
  {
    title: "Avatar: The Last Airbender",
    genre: "Adventure",
    plot: "Little boy that was cryopreserved for some hundred of years is a guy who can control 4 elements of the nature",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BMjA5NzYxNzkzNV5BMl5BanBnXkFtZTcwMTcxOTQxMw@@._V1_.jpg",
  },
  {
    title: "I Am Legend",
    genre: "Horror",
    plot: "Last days of the humanity on this planet. Or he thinks so.",
    image_url:
      "https://m.media-amazon.com/images/M/MV5BYTE1ZTBlYzgtNmMyNS00ZTQ2LWE4NjEtZjUxNDJkNTg2MzlhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_FMjpg_UX1000_.jpg",
  },
];

const celebrities = [
  {
    name: "Harrison Ford",
    occupation: "Actor",
    catchPhrase: "I have a baaad feeling about this",
  },
  {
    name: "Sean Bean",
    occupation: "Actor",
    catchPhrase: "Winter is Coming!",
  },
  {
    name: "Christian Bale",
    occupation: "Actor",
    catchPhrase: "I'm Batman",
  },
  {
    name: "Bruce Willis",
    occupation: "Actor",
    catchPhrase: "Yippee-ki-yay.",
  },
  {
    name: "Keanu Reeves",
    occupation: "Actor",
    catchPhrase: "We have a city to burn",
  },
  {
    name: "Samuel L. Jackson",
    occupation: "Actor",
    catchPhrase: "Mother******",
  },
  {
    name: "Jack Black",
    occupation: "Actor",
    catchPhrase: "COMINGTOYAAAAAHAAAAA",
  },
  {
    name: "Vin Diesel",
    occupation: "Actor",
    catchPhrase: "I don't have friends, I have Family",
  },
  {
    name: "Noah Ringer",
    occupation: "Actor",
    catchPhrase: "No guys, my Avatar isn't blue!",
  },
  {
    name: "Will Smith",
    occupation: "Actor",
    catchPhrase: "Well, all I know is what I read in the papers.",
  },
];

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connection established!");
    return CelebrityModel.create(celebrities);
  })
  .then(() => {
    console.log("Movies and Ceelebrities updated");
    return MovieModel.create(movies);
  })
  .then(() => {
    console.log("Connection closed!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log("Error while seeding db: ", err);
  });
