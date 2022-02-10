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

/* GET celebrity details */
router.get("/:id", async (req, res, next) => {
  //   console.log(req.params);
  const { id } = req.params;
  try {
    const foundCelebrity = await Celebrity.findById(id);
    console.log(foundCelebrity);
    return res.render("celebrities/celebrity-details", {
      data: foundCelebrity,
    });
  } catch (error) {
    console.log(error);
  }
});

/* POST celebrity details - delete celebrity */
router.post("/:id/delete", async (req, res, next) => {
  //   console.log(req.params);
  const { id } = req.params;
  try {
    const deletedCelebrity = await Celebrity.findByIdAndDelete(id);
    console.log(deletedCelebrity);
    return res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
  }
});

/* GET edit celebrity */
router.get("/:id/edit", async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundCelebrity = await Celebrity.findById(id);
    console.log(foundCelebrity);
    await res.render("celebrities/edit-celebrity", {
      data: foundCelebrity,
    });
  } catch (error) {
    console.log(error);
  }
});

/* POST edit celebrity */
router.post("/:id/edit", async (req, res, next) => {
  //   console.log(req.params);
  const { id } = req.params;
  const { name, ocuppation, catchPhrase } = req.body;
  try {
    const editedCelebrity = await Celebrity.findByIdAndUpdate(
      id,
      { name, ocuppation, catchPhrase },
      { new: true }
    );
    console.log(editedCelebrity);
    return res.redirect("/celebrities");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
