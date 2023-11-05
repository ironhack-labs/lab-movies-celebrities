const router = require("express").Router();

const Celebrity = require("./../models/Celebrity.model");

router.get("/celebrities/create", (req, res) => {
  res.render("celebrities/new-celebrities");
});

router.post("/celebrities/create", (req, res) => {
  const { name, ocupation, catchPhrase } = req.body;
  Celebrity.create({ name, ocupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch(() => res.redirect("celebrities/new-celebrity"));
});

router.get("/celebrities", (req, res) => {
  Celebrity
    .find()
    .then((celeb) => res.render("celebrities/celebrities", { celeb }))
    .catch((err) => console.log(err));
});

//--------------------> Iteration #6: The Celebrity Details Page

router.get("/celebrities/:id", (req, res) => {
  const { id } = req.params
  Celebrity
    .findById(id)
    .then(celebrities => res.render("celebrities/celebrity-details", celebrities))
    .catch(err => console.log(err))
})

router.post("/celebrities/:id/delete", (req, res) => {
  const { id } = req.params
  Celebrity
    .findByIdAndDelete(id)
    .then(() => res.redirect("/celebrities"))
    .catch(err => console.log(err))
})

router.get("/celebrities/:id/edit", (req, res) => {
  const { id } = req.params
  Celebrity
    .findById(id)
    .then(celebrities => res.render('celebrities/edit-celebrity', celebrities))
    .catch(err => console.log(err))
})

router.post("/celebrities/:id/edit", (req, res) => {
  const { id } = req.params
  const { name, ocupation, cp } = req.body;

  Celebrity
    .findByIdAndUpdate(id, ({ name, ocupation, cp }))
    .then(() => res.redirect(`/celebrities/${id}`))
    .catch(err => console.log(err))

})

module.exports = router;
