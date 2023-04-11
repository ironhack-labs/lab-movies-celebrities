const movieModel = require("../models/movie.model");

require("../db");

const celebrities = [
  {
    name: "Reese",
    occupation: "Actor",
    catchPhrase: "Be Happy!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Reese_Witherspoon_at_TIFF_2014.jpg/1024px-Reese_Witherspoon_at_TIFF_2014.jpg",
  },
  {
    name: "Anne Hathaway",
    occupation: "Actor",
    catchPhrase: "stay ",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Anne_Hathaway_at_Berlinale_2023_%28cropped%29.jpg/1024px-Anne_Hathaway_at_Berlinale_2023_%28cropped%29.jpg",
  },
  {
    name: "Sandra Bullock",
    occupation: "Actor",
    catchPhrase: "Carpe diem!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Sandra_Bullock_in_July_2013.jpg/800px-Sandra_Bullock_in_July_2013.jpg",
  },
  {
    name: "Denzel Washington",
    occupation: "Actor",
    catchPhrase: "Money is not the most important thing!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/40/Denzel_Washington_2018.jpg",
  },
  {
    name: "Johnny Depp",
    occupation: "Actor",
    catchPhrase: "Take it easy!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Johnny_Depp_2020.jpg/1024px-Johnny_Depp_2020.jpg",
  },
  {
    name: "Al Pacino",
    occupation: "Actor",
    catchPhrase: "i don't like the USA!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3e/Al_Pacino_2016_%2830401544240%29.jpg",
  },
  {
    name: "Meryl Streep",
    occupation: "Actor",
    catchPhrase: "Who cares!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/46/Meryl_Streep_December_2018.jpg",
  },
  {
    name: "Amy Adams",
    occupation: "Actor",
    catchPhrase: "I love black!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Amy_Adams_UK_Nocturnal_Animals_Premiere_%28cropped%29.jpg/1024px-Amy_Adams_UK_Nocturnal_Animals_Premiere_%28cropped%29.jpg",
  },
  {
    name: "Halle Berry",
    occupation: "Actor",
    catchPhrase: "To the moon and back!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Halle_Berry_by_Gage_Skidmore_2.jpg/1024px-Halle_Berry_by_Gage_Skidmore_2.jpg",
  },
  {
    name: "Scarlett Johannson",
    occupation: "Actor",
    catchPhrase: "Action movies are fun!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%2C_2%29.jpg/800px-Scarlett_Johansson_by_Gage_Skidmore_2_%28cropped%2C_2%29.jpg",
  },
  {
    name: "Daniel Craig",
    occupation: "Actor",
    catchPhrase:
      '"You have been given a licence to kill, I\'m now giving you a licence to save."',
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Daniel_Craig_in_2021.jpg/1024px-Daniel_Craig_in_2021.jpg",
  },
  {
    name: "Matt Damon",
    occupation: "Actor",
    catchPhrase: "+9",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Matt_Damon%2C_Berlinale_2023_%28cropped%29.jpg/1024px-Matt_Damon%2C_Berlinale_2023_%28cropped%29.jpg",
  },
  {
    name: "Kate Winslet",
    occupation: "Actor",
    catchPhrase: '"Move on, live and let live, forgive and forget."',
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Kate_Winslet_at_the_2017_Toronto_International_Film_Festival_%28cropped%29.jpg/800px-Kate_Winslet_at_the_2017_Toronto_International_Film_Festival_%28cropped%29.jpg",
  },
  {
    name: "Gary Ross",
    occupation: "Director",
    catchPhrase: '?Never to much to do!"',
    image: "",
  },
  {
    name: "Steven Spielberg",
    occupation: "Director",
    catchPhrase: "I dream for a living.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Steven_Spielberg_Cannes_2013_2.jpg/440px-Steven_Spielberg_Cannes_2013_2.jpg",
  },
  {
    name: "Martin Scorsese",
    occupation: "Director",
    catchPhrase: "Cinema is a matter of what's in the frame and what's out.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Martin_Scorsese_Berlinale_2010.jpg/440px-Martin_Scorsese_Berlinale_2010.jpg",
  },
  {
    name: "Quentin Tarantino",
    occupation: "Director",
    catchPhrase: "I steal from every movie ever made.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Quentin_Tarantino_by_Gage_Skidmore_3.jpg/440px-Quentin_Tarantino_by_Gage_Skidmore_3.jpg",
  },
  {
    name: "Christopher Nolan",
    occupation: "Director",
    catchPhrase:
      "The best films are ones that ask questions rather than provide answers.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Christopher_Nolan_by_Gage_Skidmore.jpg/440px-Christopher_Nolan_by_Gage_Skidmore.jpg",
  },
  {
    name: "Alfred Hitchcock",
    occupation: "Director",
    catchPhrase:
      "The length of a film should be directly related to the endurance of the human bladder.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Alfred_Hitchcock_%28portrait%29.jpg/440px-Alfred_Hitchcock_%28portrait%29.jpg",
  },
  {
    name: "Stanley Kubrick",
    occupation: "Director",
    catchPhrase:
      "The most terrifying fact about the universe is not that it is hostile but that it is indifferent.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Stanley_Kubrick.jpg/440px-Stanley_Kubrick.jpg",
  },
  {
    name: "David Fincher",
    occupation: "Director",
    catchPhrase:
      "I don't know why people hire architects and then tell them what to do.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/David_Fincher_by_Gage_Skidmore.jpg/440px-David_Fincher_by_Gage_Skidmore.jpg",
  },
  {
    name: "Spike Lee",
    occupation: "Director",
    catchPhrase:
      "I'm just trying to tell a good story and make thought-provoking, entertaining films. I just try and draw upon the great culture we have as a people, from music, novels, the streets.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Spike_Lee_at_Cannes.jpg/440px-Spike_Lee_at_Cannes.jpg",
  },
  {
    name: "Robert De Niro",
    occupation: "actor",
    catchPhrase: "You talkin' to me?",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/23/Robert_De_Niro_Cannes_2016.jpg",
  },
  {
    name: "Samuel L. Jackson",
    occupation: "actor",
    catchPhrase: "Say what again, I dare you, I double dare you!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/3f/Samuel_L_Jackson_SDCC_2014.jpg",
  },
  {
    name: "Al Pacino",
    occupation: "actor",
    catchPhrase: "Say hello to my little friend!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/23/Al_Pacino_in_1971.jpg",
  },
  {
    name: "Tom Hanks",
    occupation: "actor",
    catchPhrase:
      "Life is like a box of chocolates, you never know what you're gonna get.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Tom_Hanks_%282019%29.jpg",
  },
  {
    name: "Leonardo DiCaprio",
    occupation: "actor",
    catchPhrase: "I'm the king of the world!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/d/d7/Leonardo_Dicaprio_Cannes_2019.jpg",
  },
];

async function saveCelebrities() {
  try {
    const responseFromDB = await movieModel.create(celebrities);
    console.log("Got all the info in the DB!", responseFromDB);
  } catch (err) {
    console.log("there was an error", err);
  }
}
saveCelebrities();
