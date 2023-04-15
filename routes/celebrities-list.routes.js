const router = require("express").Router();

router.get('/celebrities-list', (req, res) => {
    console.log("trying to render list")
    res.render("celebrities/celebrities-list")
});



module.exports = router;