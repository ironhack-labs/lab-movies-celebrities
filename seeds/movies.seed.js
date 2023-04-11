const movieModel = require("../models/movie.model");

require("../db");

const movies = [
  {
    title: "Ocean's 8",
    genre: "Action",
    plot: "Debbie Ocean gathers an all-female crew to attempt an impossible heist at New York City's annual Met Gala.",
    image:
      "https://www.cinema.de/sites/default/files/styles/schema_org/public/sync/cms3.cinema.de/imgdb/import/dreams2/5a65/b81/7/5a65b817f033af67dd314b6c.jpeg?itok=P1zYWyLg",
    director: "Gary Ross",
  },
  {
    title: "Ocean's 11",
    genre: "Action",
    plot: "Danny Ocean, a gangster, assembles a group of eleven people in an effort to steal money from three popular casinos in Las Vegas owned by his rival, Terry Benedict.",
    image:
      "https://de.web.img3.acsta.net/c_310_420/medias/nmedia/18/63/50/18/19288892.jpg",
  },
  {
    title: "Avatar",
    genre: "Fantasy",
    plot: "On the lush alien world of Pandora live the Na'vi, beings who appear primitive but are highly evolved. Because the planet's environment is poisonous, human/Na'vi hybrids, called Avatars, must link to human minds to allow for free movement on Pandora. Jake Sully (Sam Worthington), a paralyzed former Marine, becomes mobile again through one such Avatar and falls in love with a Na'vi woman (Zoe Saldana). As a bond with her grows, he is drawn into a battle for the survival of her world.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/5/54/Avatar_The_Way_of_Water_poster.jpg",
  },
  {
    title: "Black Widow",
    genre: "Science fiction",
    plot: "Natasha Romanoff, a member of the Avengers and a former KGB spy, is forced to confront her dark past when a conspiracy involving her old handler arises.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/e9/Black_Widow_%282021_film%29_poster.jpg",
  },
  {
    title: "Jaws",
    genre: "Thriller",
    director: "Steven Spielberg",
    plot: "A giant man-eating great white shark attacks beachgoers on a New England summer resort island.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/eb/JAWS_Movie_poster.jpg",
  },
  {
    title: "Jurassic Park",
    genre: "Science Fiction",
    director: "Steven Spielberg",
    plot: "Scientists clone dinosaurs to create a theme park, but things go terribly wrong when the dinosaurs break free and terrorize the visitors.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
  },
  {
    title: "Taxi Driver",
    genre: "Drama",
    director: "Martin Scorsese",
    plot: "A disturbed Vietnam War veteran works as a night-time taxi driver in New York City, where the perceived decadence and sleaze feeds his urge for violent action.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/8/8f/Taxi_Driver_original_movie_poster.jpg",
  },
  {
    title: "Goodfellas",
    genre: "Crime",
    director: "Martin Scorsese",
    plot: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.",
    image: "https://upload.wikimedia.org/wikipedia/en/7/7b/Goodfellas.jpg",
  },
  {
    title: "Pulp Fiction",
    genre: "Crime",
    director: "Quentin Tarantino",
    plot: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg",
  },
  {
    title: "Kill Bill: Vol. 1",
    genre: "Action",
    director: "Quentin Tarantino",
    plot: "After awakening from a four-year coma, a former assassin wreaks vengeance on the team of assassins who betrayed her.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/cf/Kill_Bill_Volume_1.png",
  },
  {
    title: "The Godfather",
    genre: "Crime",
    director: "Francis Ford Coppola",
    plot: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    image: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
  },
  {
    title: "Apocalypse Now",
    genre: "War",
    director: "Francis Ford Coppola",
    plot: "During the Vietnam War, Captain Willard is sent on a dangerous mission into Cambodia to assassinate a renegade colonel who has set himself up as a god among a local tribe.",
    image:
      "https://upload.wikimedia.org/wikipedia/en/c/c2/Apocalypse_Now_poster.jpg",
  },
];

async function saveMovies() {
  try {
    const responseFromDB = await movieModel.create(movies);
    console.log("Got all the info in the DB!", responseFromDB);
  } catch (err) {
    console.log("there was an error", err);
  }
}
saveMovies();
