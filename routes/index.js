const router = require("express").Router();

// Home page
router.get("/", (req, res, next) => {
  res.render("index");
});

// Celebrities page
router.get("/celebrities", (req, res, next) => {
  const celebrities = [
    { name: "Tom Cruise", occupation: "Actor", catchPhrase: "Mission Accepted!" },
    { name: "Beyoncé", occupation: "Singer", catchPhrase: "Queen B" },
    { name: "Dwayne Johnson", occupation: "Actor", catchPhrase: "Can you smell what The Rock is cooking?" }
  ];

  res.render("celebrities", { celebrities }); // Passes celebrities array to the 'celebrities' view
});

module.exports = router;

