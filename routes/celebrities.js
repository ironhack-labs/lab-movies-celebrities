const async = require("hbs/lib/async");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

/* GET celebrities */
router.get("/", async (req, res, next) => {
  const allCelebrities = await Celebrity.find({});
//   console.log(allCelebrities);
  try {
    await res.render("celebrities/celebrities", {
      data: allCelebrities,
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET new celebrity */
router.get("/new-celebrity", async (req, res, next) => {
  try {
    await res.render("celebrities/new-celebrity");
  } catch (error) {
    console.log(error);
  }
});

/* POST new celebrity */
router.post("/new-celebrity", async (req, res, next) => {
  try {
    //   console.log(req.body);
    const { name, occupation, catchPhrase } = req.body;
    // console.log(`name:${name},occupation:${occupation},catchPhrase:${catchPhrase}`)
    const newCelebrity = await Celebrity.create({
      name: name,
      occupation: occupation,
      catchPhrase: catchPhrase,
    });
    // console.log(newCelebrity);
    return res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
