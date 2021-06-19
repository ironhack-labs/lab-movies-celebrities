const router = require("express").Router();

const celebrityController = require('./celebrities.routes')

/* GET home page */

router.get("/celebrities", celebrityController.home);

router.get("/celebrities/create", celebrityController.createCelebrity);
router.post("/celebrities/create", celebrityController.doCreateCelebrity);

module.exports = router;
