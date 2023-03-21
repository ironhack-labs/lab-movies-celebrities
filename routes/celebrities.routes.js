// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");
const Movie = require("../models/Movie.model")

// all your routes here
router.get("/celebrities/create",(req, res, next) => {
    res.render("celebrities/new-celebrity")
});

router.get("/celebrities", (req, res, next) => {

    Celebrity.find()
        .then((celebritiesArr) => {

            res.render("celebrities/celebrities", {celebrities: celebritiesArr});

        }).catch((err) => {
            next(err);
        });
});

router.get("/celebrities/:celebrityId", (req, res, next) => {
    const {celebrityId} = req.params;

    Celebrity.findById(celebrityId)
        .then((celebrity) => {
            res.render("celebrities/celebrity-details", {celebrity});
        }).catch((err) => {
            next(err);
        });
});

router.get("/celebrities/:celebrityId/edit", (req, res, next) => {
    const {celebrityId} = req.params;

    Celebrity.findById(celebrityId)
        .then((celebrity) => {
            res.render("celebrities/edit-celebrity", {celebrity});
        }).catch((err) => {
            next(err)
        });

});



//POST
router.post("/celebrities/create", (req, res, next) => {
    const celebrityDetails = {
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    };

    Celebrity.create(celebrityDetails)
        .then((result) => {
            res.redirect("/celebrities");
        }).catch((err) => {
            console.error(err);
            next(err);
        });
    
});

router.post("/celebrities/:celebrityId/edit", (req, res, next) => {
    const { celebrityId } = req.params;
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.findByIdAndUpdate(celebrityId, { name, occupation, catchPhrase }, { new: true })
    .then(() => {
        res.redirect("/celebrities");
    })
    .catch(error => next(error));
});

//DELETE
router.post("/celebrities/:celebrityId/delete", (req, res, next) => {
    async function deleteCelebrity(){
        try{

            const {celebrityId} = req.params;
            //Get all movies
            const moviesArr = await Movie.find();

            //Remove the celebrity from its movies
            const celebMovies = moviesArr.map((movie) => {

                movie.cast.forEach(objectId => {
                    if(toString(objectId) === toString(celebrityId)) {
                        const idPos = movie.cast.indexOf(objectId);
                        movie.cast.splice(idPos, 1);
                    }
                });
            });

            //delete celebrity document
            await Celebrity.findByIdAndDelete(celebrityId);
            console.log("Celebrity deleted!");

            res.redirect("/celebrities");


        } catch (error) {
            console.error(error);
        }
    }

    deleteCelebrity();
});


module.exports = router;