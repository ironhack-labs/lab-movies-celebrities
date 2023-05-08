const router = require("express").Router();

router.get("/profile", (req, res, next) => {
    res.render("user/profile", { user: req.session.currentUser });
});


module.exports = router;