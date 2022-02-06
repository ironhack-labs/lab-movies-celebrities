// Requerimos mongoose e importamos el modelo
const mongoose = require("mongoose");
const Movie = require("../models/Movie.model");

//Conexión a la BBDD
const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://localhost/lab-movies-celebrities";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Soy el seed Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

const movies = [
  {
    title: "Sunset Boulevard",
    genre: "Noir/Drama",
    plot: "Desperate for cash, screenwriter Joe Gillis has a chance meeting with a faded silent film star. Norma Desmond lives in her crumbling Sunset Boulevard mansion with only her butler to keep her company. She has become a sad demented recluse convinced that the outside world is clamoring for her dramatic return. Enticing him with the prospect of script work she puts him up in her mansion and he becomes ever more involved and entangled in her life.",
  },
  {
    title: "Dune",
    genre: "Fiction",
    plot: "A mythic and emotionally charged hero’s journey, Dune tells the story of Paul Atreides, a brilliant and gifted young man born into a great destiny beyond his understanding, who must travel to the most dangerous planet in the universe to ensure the future of his family and his people. As malevolent forces explode into conflict over the planet’s exclusive supply of the most precious resource in existence—a commodity capable of unlocking humanity’s greatest potential—only those who can conquer their fear will survive.",
  },
  {
    title: "Drive",
    genre: "Neo-Noir",
    plot: "This action drama follows a mysterious man who has multiple jobs as a garage mechanic, a Hollywood stuntman and a getaway driver seems to be trying to escape his shady past as he falls for his neighbor - whose husband is in prison and who's looking after her child alone. Meanwhile, his garage mechanic boss is trying to set up a race team using gangland money, which implicates our driver as he is to be used as the race team's main driver. Our hero gets more than he bargained for when he meets the man who is married to the woman he loves.",
    cast: "Ryan Gosling",
  },
  {
    title: "Barry Lyndon",
    genre: "Drama",
    plot: "In the eighteenth century, in a small village in Ireland, Redmond Barry (Ryan O'Neal) is a young farm boy in love with his cousin Nora Brady (Gay Hamilton). When Nora gets engaged to British Captain John Quin (Leonard Rossiter), Barry challenges him to a duel of pistols. He wins and escapes to Dublin, but is robbed on the road. Without an alternative, Barry joins the British Army to fight in the Seven Years War. He deserts and is forced to join the Prussian Army, where he saves the life of his Captain and becomes his protégé and spy of Irish gambler Chevalier de Balibari (Patrick Magee). He helps Chevalier and becomes his associate until he decides to marry the wealthy Lady Lyndon (Marisa Berenson). They move to England and Barry, in his obsession of nobility, dissipates her fortune and makes a dangerous and revengeful enemy.",
  },
];

//Seed the database - movies

Movie.create(movies)
  .then((x) => {
    console.log(`Created ${x.length} movies`);
    mongoose.connection.close();
  })
  .catch((err) =>
    console.log(`An error occurred while creating movies from the DB: ${err}`)
  );
