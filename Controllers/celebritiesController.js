const Celebrity = require("../models/Celebrity.model");

exports.newGetCelebrity = async (req, res) => {
  res.render("celebrities/new-celebrity");
};

exports.newPostCelebrity = async (req, res) => {
  const { name, occupation, catchPhrase } = req.body;
  console.log({ name, occupation, catchPhrase });
  try {
    const newCelebrity = await Celebrity.create({
      name,
      occupation,
      catchPhrase,
    });
    console.log(newCelebrity);
    return res.redirect("/celebrities");
  } catch (error) {
    return res.render("celebrities/new-celebrity");
  }
};

exports.listCelebrities = async (req, res) => {
  try {
    const listCel = await Celebrity.find({});
    return res.render("celebrities/celebrities", {
      listCel,
    });
  } catch (error) {}
};
