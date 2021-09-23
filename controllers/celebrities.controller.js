const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

exports.createCelebrity = (req, res) => {
  const { name, ocupation, catchPhrase } = req.body;
  Celebrity.create({
    name,
    ocupation,
    catchPhrase,
  })
    .then((newCelebrity) => {
      console.log(newCelebrity);
      res.redirect("/celebrities"); //hacia la ruta, no al archivo
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.allCelebrities = (req, res) => {
  Celebrity.find()
    .then((list) => {
      const lista = list;
      console.log(list);
      res.render("celebrities/celebrities", { celebrities: lista });
    })
    .catch((e) => {
      console.log(e);
    });
};
