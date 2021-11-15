const router = require("express").Router();
const Comic = require("../models/Comic.model")

router.get("/create", (req, res) => {
    res.render("comics/new-comic");
})


router.post("/create", (req, res) => {
     
    Comic.create(req.body)

      .then(res.redirect("/comics"))
      .catch(res.render("comics/new-comic"))
  
})


router.get("/comics", (req, res, next) => {

    Comic.find(req.body)
      .then(allComics => res.render("comics/comics", { allComics }))
      .catch(err => console.log(err))
  
});


router.get("/comics/:id", (req, res, next) => {

    const { id } = req.params

    Comic.findById(id)
        .populate("cast")
        .then(comic => res.render("comics/comic-details", comic))
        .catch(err => console.log(err))
});


router.post("/:id/delete", (req, res) => {
    
    const { id } = req.params
    
    Comic.findByIdAndDelete(id)

      .then(res.redirect("/comics"))
      .catch(err => console.log(err))
  
})


router.get("/:id/edit", (req, res, next) => {

    const { id } = req.params

    Comic.findById(id)
        .then(theComic => res.render("comics/edit-comic", { theComic }))
        .catch(err => console.log(err))
});


router.post("/:id", (req, res) => {

    const { title, genre, plot, cast } = req.body;
    const { id } = req.params
  
    Comic.findByIdAndUpdate(id, { title, genre, plot, cast }, { new: true })
      
      .then(updatedComic => res.render("comic/comic-details", updatedComic))
      .catch(err => console.log(err))
  })



module.exports = router;
