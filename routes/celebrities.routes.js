const router = require("express").Router();

const Celebrity = require("../models/Celebrity.model");

router.get("/", async (req, res) => {
  const celebrities = await Celebrity.find();

  res.render("celebrities/celebrities", {
    celebrities,
  });
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/celebrity-new");
});

router.post("/create", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    await Celebrity.create({ name, occupation, catchPhrase });
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

router.get("/:celebrityId/edit", async (req, res, next) => {
  const { celebrityId } = req.params;

  try {
    const celebrity = await Celebrity.findById(celebrityId);
    res.render("celebrities/celebrity-edit", {
      celebrity,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:celebrityId/edit", async (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  try {
    const celebrity = await Celebrity.findOneAndUpdate({
      name,
      occupation,
      catchPhrase,
    });
    res.redirect(`/celebrities/${celebrity.id}`);
  } catch (err) {
    next(err);
  }
});

router.post("/:celebrityId/delete", async (req, res, next) => {
  const { celebrityId } = req.params;

  try {
    await Celebrity.findByIdAndDelete(celebrityId);
    res.redirect("/celebrities");
  } catch (err) {
    next(err);
  }
});

router.get("/:celebrityId", async (req, res, next) => {
  const { celebrityId } = req.params;

  try {
    const celebrity = await Celebrity.findById(celebrityId);
    res.render("celebrities/celebrity-details", {
      celebrity,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
