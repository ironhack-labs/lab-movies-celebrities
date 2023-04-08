// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

// all your routes here
router.get("/create", (req,res) => {
    res.render("celebrities/new-celebrity");
});

router.post("/create", async (req,res) => {
    try {
        const newCelebrity = await CelebrityModel.create(req.body);
        res.redirect("/celebrities");
    }
    catch (err) {
        console.log(err)};
        res.redirect("celebrities/new-celebrity");
});

module.exports = router;



