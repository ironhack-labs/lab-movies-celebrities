const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/lab-movies-celebrities";

// Sample celebrities data
const celebrities = [
  { name: "Tom Hanks", occupation: "Actor", catchPhrase: "Life is like a box of chocolates" },
  { name: "Meryl Streep", occupation: "Actress", catchPhrase: "I let the character speak to me" },
  { name: "Leonardo DiCaprio", occupation: "Actor", catchPhrase: "Every next level of your life will demand a different you" },
  { name: "Jennifer Lawrence", occupation: "Actress", catchPhrase: "I'm not perfect, but I'm real" },
  { name: "Morgan Freeman", occupation: "Actor", catchPhrase: "Learning how to be still, to really be still and let life happen" },
  { name: "Scarlett Johansson", occupation: "Actress", catchPhrase: "I'm not a superhero, but I play one in movies" },
  { name: "Brad Pitt", occupation: "Actor", catchPhrase: "Success is a beast you must keep feeding" },
  { name: "Emma Stone", occupation: "Actress", catchPhrase: "What sets you apart can sometimes feel like a burden" },
  { name: "Denzel Washington", occupation: "Actor", catchPhrase: "Do what you have to do, to do what you want to do" },
  { name: "Cate Blanchett", occupation: "Actress", catchPhrase: "If you know you are going to fail, then fail gloriously" },
  { name: "Robert Downey Jr.", occupation: "Actor", catchPhrase: "Remember that just because you hit bottom doesn't mean you have to stay there" },
  { name: "Nicole Kidman", occupation: "Actress", catchPhrase: "Life has got all those twists and turns. You've got to hold on tight and off you go" },
  { name: "Christian Bale", occupation: "Actor", catchPhrase: "I only sound intelligent when there's a good script writer around" },
  { name: "Viola Davis", occupation: "Actress", catchPhrase: "The only thing that separates women of color from anyone else is opportunity" },
  { name: "Johnny Depp", occupation: "Actor", catchPhrase: "If you love two people at the same time, choose the second one" },
  { name: "Anne Hathaway", occupation: "Actress", catchPhrase: "I've always believed in people's capacity for goodness" },
  { name: "Matthew McConaughey", occupation: "Actor", catchPhrase: "Alright, alright, alright" },
  { name: "Charlize Theron", occupation: "Actress", catchPhrase: "If you're not practicing, somebody else is" },
  { name: "Ryan Gosling", occupation: "Actor", catchPhrase: "I think it's good to be a little more fearless in saying what you feel" },
  { name: "Julia Roberts", occupation: "Actress", catchPhrase: "Smile, because it's easier than explaining what's wrong" },
  { name: "Chris Evans", occupation: "Actor", catchPhrase: "I'm a big fan of working out on my own" },
  { name: "Sandra Bullock", occupation: "Actress", catchPhrase: "I'm a true believer in karma" },
  { name: "Hugh Jackman", occupation: "Actor", catchPhrase: "With great power comes great responsibility" },
  { name: "Natalie Portman", occupation: "Actress", catchPhrase: "I'd rather be smart than a movie star" },
  { name: "Will Smith", occupation: "Actor", catchPhrase: "Life is not a problem to be solved, but a reality to be experienced" }
];

// Function to get random celebrities for a movie
const getRandomCelebrities = (celebIds, min = 2, max = 5) => {
  const numCelebs = Math.floor(Math.random() * (max - min + 1)) + min;
  const shuffled = [...celebIds].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numCelebs);
};

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    // Delete existing data
    await Celebrity.deleteMany();
    await Movie.deleteMany();

    // Create celebrities
    const createdCelebrities = await Celebrity.create(celebrities);
    const celebrityIds = createdCelebrities.map(celeb => celeb._id);

    // Sample movies data with random cast assignments
    const movies = [
      {
        title: "The Last Horizon",
        genre: "Science Fiction",
        plot: "A team of astronauts discovers a mysterious signal at the edge of the solar system",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "Midnight in Paris",
        genre: "Romance",
        plot: "A writer finds himself mysteriously going back in time every night in Paris",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "The Silent Guardian",
        genre: "Action",
        plot: "A former special forces operator protects a witness from a dangerous crime syndicate",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "Lost in Translation",
        genre: "Drama",
        plot: "Two Americans form an unlikely bond while staying in Tokyo",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "The Dark Hour",
        genre: "Thriller",
        plot: "A detective races against time to solve a series of mysterious disappearances",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "Summer's End",
        genre: "Drama",
        plot: "Three generations of a family come together for one last summer at their beach house",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "The Great Escape",
        genre: "Adventure",
        plot: "A group of friends plan an elaborate heist during a high-stakes poker tournament",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "Eternal Memory",
        genre: "Science Fiction",
        plot: "A woman discovers she can access other people's memories",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "The Last Dance",
        genre: "Romance",
        plot: "A professional dancer returns to her hometown to save her old dance studio",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "Shadow of Truth",
        genre: "Mystery",
        plot: "A journalist uncovers a conspiracy that goes deeper than she could have imagined",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "The Wild Beyond",
        genre: "Adventure",
        plot: "An expedition into uncharted territory leads to unexpected discoveries",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "City Lights",
        genre: "Comedy",
        plot: "A small-town girl tries to make it big in the big city",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "The Perfect Storm",
        genre: "Drama",
        plot: "A weather scientist must warn a skeptical town about an approaching super-storm",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "Quantum Dreams",
        genre: "Science Fiction",
        plot: "A physicist discovers a way to communicate with parallel universes",
        cast: getRandomCelebrities(celebrityIds)
      },
      {
        title: "The Last Stand",
        genre: "Action",
        plot: "A retired soldier must defend his town from a dangerous criminal gang",
        cast: getRandomCelebrities(celebrityIds)
      }
    ];

    // Create movies
    await Movie.create(movies);

    console.log('Database seeded! 🎬');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Error seeding the database:', err);
    mongoose.connection.close();
  }); 